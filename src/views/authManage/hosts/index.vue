<template>
  <div>
    <div class="table-box">
      <div class="mwj-btn-list">
        <el-button type="primary" icon="plus" @click="addRrSet">添加记录</el-button>

      </div>
      <el-table :data="hostList" row-key="ID">

        <el-table-column align="left" label="主机记录" min-width="200" prop="host" />
        <el-table-column align="left" label="记录类型" min-width="200" prop="r_typ" />
        <el-table-column align="left" label="vid" min-width="200" prop="vid" />
        <el-table-column align="left" label="v_typ" min-width="200" prop="v_typ" />

        <el-table-column label="操作" min-width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" link icon="edit" @click="manageRrSet(scope.row)">管理</el-button>
            <el-button type="primary" link icon="delete" @click="deleteUserFunc(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="el-pagination" style='justify-content: center'>
        <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
          layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" />
      </div>
    </div>

    <div>
      <el-drawer v-model="drawer_rrset" direction="rtl" :before-close="handleClose" size="750" destroy-on-close>
        <template #header>
          <h4>配置记录</h4>

        </template>
        <template #default>

          <!-- readonly -->
          <div class="card mb10" v-if="displayReadOnlyStat">
            <h5 class="title">基本信息</h5>
            <!-- class-name="color_label" -->
            <el-descriptions :column="1" border size="default">
              <el-descriptions-item label="域名" label-align="left" label-class-name="host-custom-label">
                <el-tag class="wrap-tag">{{ _host }}.{{ _zone }}</el-tag>
                <!-- <el-tag
                  class="wrap-tag">hellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdahellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdaddsddsddsdsgdsgsdggfgdfggfgdfgdfgd</el-tag> -->
              </el-descriptions-item>
              <el-descriptions-item label="记录类型" label-align="left">
                <el-tag>{{ _rtyp }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="线路" label-align="left">
                <!-- <el-tag>{{ _vid }}</el-tag> -->
                <el-tag :type="_vid === 1 ? 'primary' : 'warning'" disable-transitions>{{ _vid ==
                  1 ? '默认' : '未知' }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="负载均衡" label-align="left"
                v-if="(_rtyp === 'A' || _rtyp === 'AAAA' || _rtyp === 'CNAME')">
                <el-tag :type="_lb === 1 ? 'success' : 'info'" disable-transitions>{{ _lb ==
                  1 ? '开启' : '关闭' }}</el-tag>

              </el-descriptions-item>

            </el-descriptions>
          </div>

          <!-- writable -->
          <div class="card mb10" v-if="!displayReadOnlyStat">
            <h5 class="title">基本信息</h5>
            <el-descriptions :column="1" border size="default">
              <el-descriptions-item label="域名" label-align="left" label-class-name="host-custom-label">

                <div class="mt-4">
                  <el-input v-model="_input_host" style="max-width: 600px" placeholder="Please input">
                    <template #append>.{{ _input_zone }}</template>
                  </el-input>
                </div>

                <!-- <el-tag
                  class="wrap-tag">hellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdahellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdaddsddsddsdsgdsgsdggfgdfggfgdfgdfgd</el-tag> -->
              </el-descriptions-item>
              <el-descriptions-item label="记录类型" label-align="left">

                <div class="mt-4">
                  <el-select v-model="_input_rtyp" placeholder="Select" style="max-width: 600px">
                    <el-option label="A" value="A" />
                    <el-option label="AAAA" value="AAAA" />
                    <el-option label="CNAME" value="CNAME" />
                    <el-option label="TXT" value="TXT" />
                    <el-option label="MX" value="MX" />
                    <el-option label="CAA" value="CAA" />
                    <el-option label="SRV" value="SRV" />
                    <el-option label="NS" value="NS" />
                    <el-option label="SOA" value="SOA" />

                  </el-select>
                </div>

              </el-descriptions-item>
              <el-descriptions-item label="线路" label-align="left">
                <el-select v-model="_input_vid" placeholder="Select" filterable style="max-width: 600px">
                  <el-option-group v-for="group in _view_options" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-option-group>
                </el-select>

              </el-descriptions-item>

              <el-descriptions-item label="负载均衡" label-align="left"
                v-if="(_input_rtyp === 'A' || _input_rtyp === 'AAAA' || _input_rtyp === 'CNAME')">

                <el-radio-group v-model="_input_lb">
                  <el-radio :value="0">关闭</el-radio>
                  <el-radio :value="1">开启</el-radio>
                </el-radio-group>

              </el-descriptions-item>

            </el-descriptions>
          </div>


          <!-- readonly -->
          <div class="card mb10" v-if="displayReadOnlyStat">
            <h5 class="title">记录信息</h5>

            <el-table :data="_rrSet">

              <el-table-column align="left" label="记录值" min-width="200" prop="data" />
              <el-table-column align="left" label="权重" min-width="40" prop="wt"
                v-if="(_rtyp === 'A' || _rtyp === 'AAAA' || _rtyp === 'CNAME') && _lb === 1" />
              <el-table-column align="left" label="TTL" min-width="50" prop="ttl" />

              <el-table-column align="left" label="状态" min-width="40">
                <template #default="scope">
                  <el-tag :type="scope.row.stat === 0 ? 'success' : 'info'" disable-transitions>{{ scope.row.stat ==
                    0 ? '启用' : '暂停' }}</el-tag>
                </template>

              </el-table-column>

            </el-table>
          </div>


          <!-- writeable -->
          <div class="card mb10" v-if="!displayReadOnlyStat">
            <h5 class="title">记录信息</h5>

            <el-table :data="_input_rrSet">
              <el-table-column align="left" label="记录值" min-width="200">
                <template #default="scope">
                  <el-input size="default" placeholder="请输入内容" v-model="scope.row.data"></el-input>
                </template>
              </el-table-column>

              <el-table-column align="left" label="权重" min-width="90"
                v-if="(_input_rtyp === 'A' || _input_rtyp === 'AAAA' || _input_rtyp === 'CNAME') && _input_lb === 1">
                <template #default="scope">

                  <el-input-number v-model="scope.row.wt" :min="0" :max="100" size="default" style="width: 80px;"
                    :value-on-clear="1" controls-position="right">
                    <template #decrease-icon>
                      <el-icon>
                        <Minus />
                      </el-icon>
                    </template>
                    <template #increase-icon>
                      <el-icon>
                        <Plus />
                      </el-icon>
                    </template>
                  </el-input-number>

                </template>
              </el-table-column>

              <el-table-column align="left" label="TTL" min-width="100">
                <template #default="scope">
                  <el-input-number v-model="scope.row.ttl" :min="60" :max="86400" size="default" style="width: 100px;"
                    :value-on-clear="60" controls-position="right">
                    <template #decrease-icon>
                      <el-icon>
                        <Minus />
                      </el-icon>
                    </template>
                    <template #increase-icon>
                      <el-icon>
                        <Plus />
                      </el-icon>
                    </template>
                  </el-input-number>
                </template>
              </el-table-column>

              <el-table-column align="left" label="状态" min-width="50">

                <template #default="scope">
                  <el-switch v-model="scope.row.stat" inline-prompt :active-value="0" :inactive-value="1" />

                </template>
              </el-table-column>

              <el-table-column label="操作" min-width="80" fixed="right">
                <template #default="scope">
                  <el-button type="danger" link icon="delete" @click="delRrFn(scope.row, scope.$index)"></el-button>
                </template>
              </el-table-column>

            </el-table>

            <div style="padding: 10px 12px 0 12px">
              <el-button type="primary" :icon="Plus" plain @click="addRrFunc()"></el-button>
            </div>


          </div>

        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button v-show="displayReadOnlyStat" type="warning" @click="configRrSet" plain>配置</el-button>
            <el-button v-show="!displayReadOnlyStat" type="primary" @click="postRrSet" plain>提交</el-button>
            <el-button v-show="!displayReadOnlyStat" @click="cancelConfigRrSet()" plain>取消</el-button>
          </div>
        </template>
      </el-drawer>
    </div>

  </div>


</template>

<script setup>

import { getHostList, getRrset, postRrset } from '@/api/modules/host'

import { nextTick, ref } from 'vue'
import { ElMessage, ElMessageBox, ElDrawer } from 'element-plus'

import { Plus } from "@element-plus/icons-vue";
// , CirclePlus, Delete, EditPen, Download, Upload
defineOptions({
  name: 'Host',
})


let refer_cancel = '';

const displayReadOnlyStat = ref(true);

// readonly
const _host = ref('');
const _zone = ref('');
const _rtyp = ref('');
const _lb = ref(0);
const _vid = ref('');
const _vtyp = ref('');
const _rrSet = ref([]);

// writeable
const _input_host = ref('');
const _input_zone = ref('');
const _input_rtyp = ref('');
const _input_lb = ref(0);
const _input_vid = ref('');
const _input_vtyp = ref('');
const _input_rrSet = ref([]);

const _view_options = [
  {
    label: '默认线路',
    options: [
      {
        value: 1,
        label: 'Default',
      },
    ],
  },
  // {
  //   label: 'City name',
  //   options: [
  //     {
  //       value: 'Chengdu',
  //       label: 'Chengdu',
  //     },
  //     {
  //       value: 'Shenzhen',
  //       label: 'Shenzhen',
  //     },
  //     {
  //       value: 'Guangzhou',
  //       label: 'Guangzhou',
  //     },
  //     {
  //       value: 'Dalian',
  //       label: 'Dalian',
  //     },
  //   ],
  // },
];

const configRrSet = () => {
  console.log("configRrSet");

  // writeable
  _input_host.value = _host.value;
  _input_zone.value = _zone.value;
  _input_rtyp.value = _rtyp.value;
  _input_lb.value = _lb.value;
  _input_vid.value = _vid.value;
  _input_vtyp.value = _vtyp.value;

  _input_rrSet.value = JSON.parse(JSON.stringify(_rrSet.value));

  displayReadOnlyStat.value = !displayReadOnlyStat.value;
};

const addRrFunc = () => {

  console.log("---addRrFunc");
  // lb: 1, r_typ:"A",
  _input_rrSet.value.push({ data: "", stat: 0, ttl: 300, wt: 1 });

};

const drawer_rrset = ref(false)

const handleClose = () => {
  drawer_rrset.value = false;
  displayReadOnlyStat.value = true;
};

function cancelConfigRrSet() {

  if (refer_cancel == 'addRrSet') {
    // 关闭抽屉
    drawer_rrset.value = false;
  } else {
    // 显示只读页面
    displayReadOnlyStat.value = true;
  }

}

function postRrSet() {

  console.log("host: ", _host.value, "; zone: ", _zone.value, "; r_typ: ", _rtyp.value, "; vid: ", _vid.value, "; v_typ: ", _vtyp.value, "; lb: ", _lb.value)

  let jsonData = {
    host: _input_host.value,
    rtyp: _input_rtyp.value,
    vid: _input_vid.value,
    vtyp: _input_vtyp.value,
    lb: _input_lb.value,
    rr: []
  };

  for (let inx = 0; inx < _input_rrSet.value.length; inx++) {
    jsonData.rr.push({ rdata: _input_rrSet.value[inx].data, ttl: _input_rrSet.value[inx].ttl, wt: _input_rrSet.value[inx].wt, stat: _input_rrSet.value[inx].stat });
  }

  console.log(JSON.stringify(jsonData, null, 2));

  let jsonBody = {
    zone: _zone.value,
    data: [jsonData] // JSON.stringify(jsonData)
  };

  ElMessageBox.confirm(`确认提交吗?`)
    .then(async () => {

      // 异步操作，可以使用 await
      let ret = await postRrset(jsonBody);

      if (ret.errcode === 0) {
        // 执行成功后的逻辑

        ElMessage({
          type: 'success',
          duration: 3000,
          customClass: 'messageIndex',
          message: "提交成功",
        });

        bindRrsetData(_input_zone.value, _input_host.value, _input_rtyp.value, _input_vid.value, _input_vtyp.value);

        if (_rrSet.value.length == 0) {
          // 若删除了整个 rrset，则关闭抽屉
          drawer_rrset.value = false;
        } else {
          // 展示只读状态的抽屉
          displayReadOnlyStat.value = true;
        }

        initPage();
      }

    })
    .catch(() => {
      // catch error
      console.log("postRrset unexpected error");
    })
}

// -----------------------------

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const hostList = ref([])

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val

  bindHostData(route.params.zone, val, page.value)
}

// 当前页
const handleCurrentChange = (val) => {
  page.value = val;

  bindHostData(route.params.zone, pageSize.value, val);
}

// 查询 host 列表
const bindHostData = async (zone, page_size, page_no) => {

  let ret = await getHostList({ zone: zone, page_no: page_no, page_size: page_size });

  if (ret.errcode == 0) {
    hostList.value = ret.data.records;
    total.value = ret.data.total;
    page.value = page_no; // table.data.page;
    pageSize.value = page_size; // table.data.pageSize;
  }
}

// ---------


const bindRrsetData = async (zone, host, r_typ, vid, v_typ) => {

  // /api/v1/name/zone/ooxx.website/host/1/data?r_typ=A&vid=1&v_typ=1
  let ret = await getRrset({ zone: zone, host: host, r_typ: r_typ, vid: vid, v_typ: v_typ });

  console.log("getRrset ret: ", ret);

  if (ret.errcode == 0) {
    if (ret.data.rrs.length > 0) {

      _rtyp.value = ret.data.rrs[0].r_typ;
      _lb.value = ret.data.rrs[0].lb;

      _host.value = host;
      _zone.value = zone;
      _vid.value = vid;
      _vtyp.value = v_typ;

    }

    _rrSet.value = ret.data.rrs;
  }
}


// const router = useRouter();
const route = useRoute();

const initPage = async () => {
  // console.log("pageSize.value: ", pageSize.value);

  await bindHostData(route.params.zone, pageSize.value, page.value)
}

const delRrFn = async (row, inx) => {
  ElMessageBox.confirm('确定要删除该记录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {

    _input_rrSet.value.splice(inx, 1);

  })
}

const addRrSet = () => {

  refer_cancel = 'addRrSet';

  _input_host.value = "";
  _input_zone.value = route.params.zone;
  _input_rtyp.value = "A";
  _input_lb.value = 0;
  _input_vid.value = 1;
  _input_vtyp.value = 1;

  _input_rrSet.value = [];

  displayReadOnlyStat.value = false;

  drawer_rrset.value = true;

};

const manageRrSet = (row) => {

  refer_cancel = 'manageRrSet';

  let ret = row;

  console.log("open drawer");

  bindRrsetData(ret.zone, ret.host, ret.r_typ, ret.vid, ret.v_typ);

  drawer_rrset.value = true;
}

initPage();

// const addUser = () => {
//   dialogFlag.value = 'add';
//   addUserDialog.value = true;

//   console.log("add user()");

//   let t1 = import.meta.env.VITE_GLOB_APP_TITLE;
//   console.log(t1);

//   let t2 = import.meta.env.VITE_BASE_PATH;
//   console.log(t2);

//   let t3 = import.meta.env.VITE_API_URL;
//   console.log(t3);
// }

</script>



<style scoped>
.wrap-tag {
  white-space: normal;
  height: auto;
  padding: 8px;
  display: inline-block;
  font-size: 13px;
  min-height: 35px;
  line-height: 18px;
  word-wrap: break-word;
  word-break: break-word;
  /* max-width: 600px; */
}

.drawer-header-box {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 0; */
  /* padding: 10px; */
  /* list-style: none; */
  /* background-color: #eee; */
}

/* .drawer-footer-box {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

.el-input-number {
  width: 90px;
}

.host-box {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
</style>

<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    // font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }

  // .text {
  //   font-size: 15px;
  //   line-height: 25px;
  //   color: var(--el-text-color-regular);
  //   .el-link {
  //     font-size: 15px;
  //   }
  // }
}
</style>


<style scoped>
:deep(.el-drawer__header) {
  background-color: rgb(245, 245, 245);
  padding: 0px 20px;
  height: 50px;
  /* color: #000000; */
  margin-bottom: 0px;
}

:deep(.el-drawer__title) {
  font-size: 20px;
}
</style>

<style lang="scss">
.host-custom-label {
  width: 120px;
}

.messageIndex {
  z-index: 3000 !important;
}
</style>