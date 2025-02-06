<template>
  <div>
    <div class="table-box">
      <div class="mwj-btn-list">
        <el-button type="primary" icon="plus" @click="addRrSet">添加记录</el-button>

      </div>
      <el-table :data="hostList" row-key="ID">
        <!-- <el-table-column align="left" label="ID" min-width="50" prop="ID" /> -->
        <!-- <el-table-column align="left" label="用户名" min-width="150" prop="userName" /> -->
        <!-- <el-table-column align="left" label="昵称" min-width="150" prop="nickName" /> -->
        <!-- <el-table-column align="left" label="手机号" min-width="180" prop="phone" /> -->
        <!-- <el-table-column align="left" label="邮箱" min-width="180" prop="email" /> -->

        <el-table-column align="left" label="主机记录" min-width="200" prop="host" />
        <el-table-column align="left" label="记录类型" min-width="200" prop="r_typ" />
        <el-table-column align="left" label="vid" min-width="200" prop="vid" />
        <el-table-column align="left" label="v_typ" min-width="200" prop="v_typ" />

        <!-- <el-table-column align="left" label="域名" min-width="200" prop="zone" /> -->
        <!-- <el-table-column align="left" label="添加时间" min-width="180" prop="created_at" /> -->

        <!-- <el-table-column align="left" label="启用" min-width="150">
          <template #default="scope">
            <el-switch v-model="scope.row.enable" inline-prompt :active-value="1" :inactive-value="2"
              @change="() => { switchEnable(scope.row) }" />
          </template>
</el-table-column> -->

        <el-table-column label="操作" min-width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" link icon="edit" @click="manageRrSet(scope.row)">管理</el-button>
            <el-button type="primary" link icon="delete" @click="deleteUserFunc(scope.row)">删除</el-button>

            <!-- <el-button type="primary" style="margin-left: 16px" @click="drawer2 = true">with footer</el-button> -->


            <!-- <el-button type="primary" link icon="magic-stick" @click="resetPasswordFunc(scope.row)">重置密码</el-button> -->
          </template>
        </el-table-column>

      </el-table>
      <div class="el-pagination" style='justify-content: center'>
        <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
          layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" />
      </div>
    </div>

    <!-- <el-dialog v-model="addUserDialog" title="用户" :show-close="false" :close-on-press-escape="false"
      :close-on-click-modal="false">
      <div style="height:60vh;overflow:auto;padding:0 12px;">
        <el-form ref="userForm" :rules="rules" :model="userInfo" label-width="80px">
          <el-form-item v-if="dialogFlag === 'add'" label="用户名" prop="userName">
            <el-input v-model="userInfo.userName" />
          </el-form-item>
          <el-form-item v-if="dialogFlag === 'add'" label="密码" prop="password">
            <el-input v-model="userInfo.password" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="userInfo.nickName" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userInfo.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" />
          </el-form-item>
          <el-form-item label="启用" prop="disabled">
            <el-switch v-model="userInfo.enable" inline-prompt :active-value="1" :inactive-value="2" />
          </el-form-item>
        </el-form>

      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeAddUserDialog">取 消</el-button>
          <el-button type="primary" @click="enterAddUserDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog> -->

    <div>
      <!-- :open="open_drawer_rrset" -->
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

                <!-- <el-tag>{{ _lb }}</el-tag> -->

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
                <!-- <el-tag class="wrap-tag">{{ _host }}.{{ _zone }}</el-tag> -->


                <div class="mt-4">
                  <el-input v-model="_host" style="max-width: 600px" placeholder="Please input">
                    <template #append>.{{ _zone }}</template>
                  </el-input>
                </div>

                <!-- <el-tag
                  class="wrap-tag">hellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdahellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdaddsddsddsdsgdsgsdggfgdfggfgdfgdfgd</el-tag> -->
              </el-descriptions-item>
              <el-descriptions-item label="记录类型" label-align="left">

                <div class="mt-4">
                  <el-select v-model="_rtyp" placeholder="Select" style="max-width: 600px">
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
                <!-- <el-tag>{{ _view }}</el-tag> -->
                <el-select v-model="_vid" placeholder="Select" filterable style="max-width: 600px">
                  <el-option-group v-for="group in _view_options" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-option-group>
                </el-select>

              </el-descriptions-item>

              <el-descriptions-item label="负载均衡" label-align="left"
                v-if="(_rtyp === 'A' || _rtyp === 'AAAA' || _rtyp === 'CNAME')">

                <el-radio-group v-model="_lb">
                  <el-radio :value="0">关闭</el-radio>
                  <el-radio :value="1">开启</el-radio>
                </el-radio-group>

              </el-descriptions-item>

            </el-descriptions>
          </div>



          <div class="card mb10" v-if="displayReadOnlyStat">
            <h5 class="title">记录信息</h5>

            <el-table :data="rrSet">

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


          <div class="card mb10" v-if="!displayReadOnlyStat">
            <h5 class="title">记录信息</h5>

            <el-table :data="rrSet">

              <!-- <el-table-column align="left" label="记录值" min-width="200" prop="data" /> -->
              <el-table-column align="left" label="记录值" min-width="200">
                <template #default="scope">
                  <el-input size="default" placeholder="请输入内容" v-model="scope.row.data"></el-input>
                </template>
              </el-table-column>

              <el-table-column align="left" label="权重" min-width="90"
                v-if="(_rtyp === 'A' || _rtyp === 'AAAA' || _rtyp === 'CNAME') && _lb === 1">
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

              <el-table-column align="left" label="状态" min-width="50" prop="stat">

                <template #default="scope">
                  <el-switch v-model="scope.row.stat" inline-prompt :active-value="0" :inactive-value="1" />

                  <!-- <el-switch v-model="scope.row.stat" inline-prompt :active-value="0" :inactive-value="1"
                    @change="() => { switchEnable(scope.row) }" /> -->
                </template>
              </el-table-column>




              <!-- <el-table-column align="left" label="vid" min-width="200" prop="vid" />
              <el-table-column align="left" label="v_typ" min-width="200" prop="v_typ" /> -->

              <!-- <el-table-column align="left" label="域名" min-width="200" prop="zone" /> -->
              <!-- <el-table-column align="left" label="添加时间" min-width="180" prop="created_at" /> -->

              <!-- <el-table-column align="left" label="启用" min-width="150">
              <template #default="scope">
                 <el-switch v-model="scope.row.enable" inline-prompt :active-value="1" :inactive-value="2"
               @change="() => { switchEnable(scope.row) }" />
                  </template>
                 </el-table-column> -->

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
import { ElMessage, ElMessageBox, ElDrawer, ElNotification } from 'element-plus'

import { Plus } from "@element-plus/icons-vue";
// , CirclePlus, Delete, EditPen, Download, Upload
defineOptions({
  name: 'Host',
})


let displayReadOnlyStat = ref(true);

// const _host_input = ref('');

// readonly
const _rtyp = ref('');
const _host = ref('');
const _zone = ref('');
const _vid = ref('');
const _vtyp = ref('');
const _lb = ref(0);

// writeable
// const _r_typ = ref('');
// const _host = ref('');
// const _zone = ref('');
// const _vid = ref('');
// const _v_typ = ref('');
// const _lb = ref(0);


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
  displayReadOnlyStat.value = !displayReadOnlyStat.value;
};

const addRrFunc = () => {

  console.log("---addRrFunc");
  // lb: 1, r_typ:"A",
  rrSet.value.push({ data: "", stat: 0, ttl: 300, wt: 1 });

};

const drawer_rrset = ref(false)

const rrSet = ref([]);

const handleClose = () => {
  drawer_rrset.value = false;
  displayReadOnlyStat.value = true;

  // router.push({ query: {} });
};

// const open_drawer_rrset = () => {
//   console.log("open_drawer_rrset");
// };

// const handleClose = () => {
//   ElMessageBox.confirm('Are you sure you want to close this?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }

function cancelConfigRrSet() {
  // drawer_rrset.value = false

  bindRrsetData(_zone.value, _host.value, _rtyp.value, _vid.value, _vtyp.value);

  displayReadOnlyStat.value = true;
}

function postRrSet() {

  console.log("host: ", _host.value, "; zone: ", _zone.value, "; r_typ: ", _rtyp.value, "; vid: ", _vid.value, "; v_typ: ", _vtyp.value, "; lb: ", _lb.value)

  let jsonData = {
    host: _host.value,
    rtyp: _rtyp.value,
    vid: _vid.value,
    vtyp: _vtyp.value,
    lb: _lb.value,
    rr: []
  };

  for (let inx = 0; inx < rrSet.value.length; inx++) {
    jsonData.rr.push({ rdata: rrSet.value[inx].data, ttl: rrSet.value[inx].ttl, wt: rrSet.value[inx].wt, stat: rrSet.value[inx].stat });
  }

  // userInfo.value = JSON.parse(JSON.stringify(row))

  console.log(JSON.stringify(jsonData, null, 2));


  // console.log("-----rrSet.value.length: ", rrSet.value.length);s
  // console.log("-----rrSet.value: ", rrSet.value);

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
        // displayReadOnlyStat.value = true;

        ElMessage({
          type: 'success',
          duration: 3000,
          customClass: 'messageIndex',
          message: "提交成功",
        });

        // ElNotification({
        //   title: 'Success',
        //   message: 'This is a success message',
        //   type: 'success',
        // });

        cancelConfigRrSet();

      }

    })
    .catch(() => {
      // catch error
    })
}

// -----------------------------

// const drawer2 = ref(false)
// const direction = ref<DrawerProps['direction']>('rtl')

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

    rrSet.value = ret.data.rrs;
  }
}


// const router = useRouter();
const route = useRoute();

const initPage = async () => {
  // console.log("pageSize.value: ", pageSize.value);

  await bindHostData(route.params.zone, pageSize.value, 1)
}

initPage()

// const resetPasswordFunc = (row) => {
//   ElMessageBox.confirm(
//     '是否将此用户密码重置为123456?',
//     '警告',
//     {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning',
//     }
//   ).then(async () => {
//     ElMessage({
//       type: 'success',
//       message: "重置密码成功",
//     })
//   })
// }

const delRrFn = async (row, inx) => {
  ElMessageBox.confirm('确定要删除该记录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {

    rrSet.value.splice(inx, 1);

  })
}

// const deleteUserFunc = async (row) => {
//   ElMessageBox.confirm('确定要删除吗?', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   }).then(async () => {

//     rrSet.value.splice(row.index, 1);

//     ElMessage.success('删除成功')
//     await bindHostData()

//   })
// }

// // 弹窗相关
// const userInfo = ref({
//   username: '',
//   password: '',
//   nickName: '',
//   enable: 1,
// })

// const rules = ref({
//   userName: [
//     { required: true, message: '请输入用户名', trigger: 'blur' },
//     { min: 5, message: '最低5位字符', trigger: 'blur' }
//   ],
//   password: [
//     { required: true, message: '请输入用户密码', trigger: 'blur' },
//     { min: 6, message: '最低6位字符', trigger: 'blur' }
//   ],
//   nickName: [
//     { required: true, message: '请输入用户昵称', trigger: 'blur' }
//   ],
//   phone: [
//     { pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur' },
//   ],
//   email: [
//     { pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请输入正确的邮箱', trigger: 'blur' },
//   ],
// })
// const userForm = ref(null)
// const enterAddUserDialog = async () => {
//   userForm.value.validate(async valid => {
//     if (valid) {
//       const req = {
//         ...userInfo.value
//       }
//       if (dialogFlag.value === 'add') {
//         const res = await register(req)
//         if (res.code === 0) {
//           ElMessage({ type: 'success', message: '创建成功' })
//           await bindHostData()
//           closeAddUserDialog()
//         }
//       }
//       if (dialogFlag.value === 'edit') {
//         if (res.code === 0) {
//           ElMessage({ type: 'success', message: '编辑成功' })
//           await bindHostData()
//           closeAddUserDialog()
//         }
//       }
//     }
//   })
// }

// const addUserDialog = ref(false)
// const closeAddUserDialog = () => {
//   userForm.value.resetFields()
//   addUserDialog.value = false
// }

// const dialogFlag = ref('add')

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

const addRrSet = () => {

  drawer_rrset.value = true;

  displayReadOnlyStat.value = false;


  _rtyp.value = "A";
  _lb.value = 0;

  _host.value = "";
  _zone.value = route.params.zone;
  _vid.value = 1;
  _vtyp.value = 1;

  rrSet.value = [];
};


const manageRrSet = (row) => {

  let ret = row;

  console.log("open drawer");

  bindRrsetData(ret.zone, ret.host, ret.r_typ, ret.vid, ret.v_typ);

  drawer_rrset.value = true;
}

// const switchEnable = async (row) => {
//   userInfo.value = JSON.parse(JSON.stringify(row))
//   await nextTick()
//   const req = {
//     ...userInfo.value
//   }
//   ElMessage({ type: 'success', message: `${req.enable === 2 ? '禁用' : '启用'}成功` })
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