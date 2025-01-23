<template>
  <div>
    <div class="table-box">
      <div class="mwj-btn-list">
        <el-button type="primary" icon="plus" @click="addUser">添加记录</el-button>

      </div>
      <el-table :data="tableData" row-key="ID">
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
            <el-button type="primary" link icon="edit" @click="openEdit(scope.row)">管理</el-button>
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
    <el-dialog v-model="addUserDialog" title="用户" :show-close="false" :close-on-press-escape="false"
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
    </el-dialog>

    <div>
      <el-drawer v-model="drawer_rrset" direction="rtl" :open="open_drawer_rrset" :before-close="handleClose"
        size="750">
        <template #header>
          <h4>配置记录</h4>

        </template>
        <template #default>

          <div class="card mb10">
            <h5 class="title">基本信息</h5>

            <el-descriptions :column="1" border size="default">
              <el-descriptions-item label="域名" label-align="left" width="20px">
                <el-tag class="wrap-tag">baidu.com</el-tag>

                <!-- <el-tag
                  class="wrap-tag">hellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdahellofsafsdfdsagdsagsdfsdafsdafsdafasdgdsagasdgsadgsadgagagasgagagaggagagsggagagsagagasgasgasgsgagasdgsgsdgagdaddsddsddsdsgdsgsdggfgdfggfgdfgdfgd</el-tag> -->

              </el-descriptions-item>
              <el-descriptions-item label="记录类型" label-align="left">
                <!-- <el-tag>{{ lastBuildTime }}</el-tag> -->
                <el-tag>A</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="线路" label-align="left">
                <el-tag>Default</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="负载均衡" label-align="left">
                <el-tag>已开启</el-tag>
              </el-descriptions-item>

            </el-descriptions>
          </div>
          <!--  -->

          <div class="card mb10">
            <h5 class="title">记录值</h5>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="线路">
                <el-tag type="info">
                  hello
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>

        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button type="warning" @click="test_btn" plain>配置</el-button>
            <el-button @click="cancelClick" plain>取消</el-button>
            <el-button type="primary" @click="confirmClick" plain>提交</el-button>
          </div>
        </template>
      </el-drawer>
    </div>

  </div>


</template>

<script setup>

import { getTableUserList } from '@/api/modules/user'

import { getHostList, getRrset } from '@/api/modules/host'

import { nextTick, ref } from 'vue'
import { ElMessage, ElMessageBox, ElDrawer } from 'element-plus'

// import { CirclePlus, Delete, EditPen, Download, Upload } from "@element-plus/icons-vue";

defineOptions({
  name: 'Host',
})


const test_btn = () => {
  console.log("test_btn");
}


const drawer_rrset = ref(false)

const handleClose = () => {
  drawer_rrset.value = false;
};

const open_drawer_rrset = () => {
  console.log("open_drawer_rrset");
};

// const handleClose = () => {
//   ElMessageBox.confirm('Are you sure you want to close this?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }

function cancelClick() {
  drawer_rrset.value = false
}

function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ?`)
    .then(() => {
      drawer_rrset.value = false
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
const tableData = ref([])

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
    tableData.value = ret.data.records;
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
    // tableData.value = ret.data.records;
    // total.value = ret.data.total;
    // page.value = page_no; // table.data.page;
    // pageSize.value = page_size; // table.data.pageSize;
  }
}


// const router = useRouter();
const route = useRoute();

const initPage = async () => {
  // console.log("pageSize.value: ", pageSize.value);

  await bindHostData(route.params.zone, pageSize.value, 1)
}

initPage()

const resetPasswordFunc = (row) => {
  ElMessageBox.confirm(
    '是否将此用户密码重置为123456?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    ElMessage({
      type: 'success',
      message: "重置密码成功",
    })
  })
}

const deleteUserFunc = async (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    ElMessage.success('删除成功')
    await bindHostData()
  })
}

// 弹窗相关
const userInfo = ref({
  username: '',
  password: '',
  nickName: '',
  enable: 1,
})

const rules = ref({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '最低5位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 6, message: '最低6位字符', trigger: 'blur' }
  ],
  nickName: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur' },
  ],
  email: [
    { pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请输入正确的邮箱', trigger: 'blur' },
  ],
})
const userForm = ref(null)
const enterAddUserDialog = async () => {
  userForm.value.validate(async valid => {
    if (valid) {
      const req = {
        ...userInfo.value
      }
      if (dialogFlag.value === 'add') {
        const res = await register(req)
        if (res.code === 0) {
          ElMessage({ type: 'success', message: '创建成功' })
          await bindHostData()
          closeAddUserDialog()
        }
      }
      if (dialogFlag.value === 'edit') {
        if (res.code === 0) {
          ElMessage({ type: 'success', message: '编辑成功' })
          await bindHostData()
          closeAddUserDialog()
        }
      }
    }
  })
}

const addUserDialog = ref(false)
const closeAddUserDialog = () => {
  userForm.value.resetFields()
  addUserDialog.value = false
}

const dialogFlag = ref('add')

const addUser = () => {
  dialogFlag.value = 'add';
  addUserDialog.value = true;

  console.log("add user()");

  let t1 = import.meta.env.VITE_GLOB_APP_TITLE;
  console.log(t1);

  let t2 = import.meta.env.VITE_BASE_PATH;
  console.log(t2);

  let t3 = import.meta.env.VITE_API_URL;
  console.log(t3);
}


const openEdit = (row) => {
  dialogFlag.value = 'edit';
  // userInfo.value = JSON.parse(JSON.stringify(row))
  // addUserDialog.value = true

  let ret = JSON.parse(JSON.stringify(row));

  console.log("ret: ", ret);

  console.log("open drawer");

  // (zone, host, r_typ, vid, v_typ)

  bindRrsetData(ret.zone, ret.host, ret.r_typ, ret.vid, ret.v_typ);

  drawer_rrset.value = true;
}

const switchEnable = async (row) => {
  userInfo.value = JSON.parse(JSON.stringify(row))
  await nextTick()
  const req = {
    ...userInfo.value
  }
  ElMessage({ type: 'success', message: `${req.enable === 2 ? '禁用' : '启用'}成功` })
}

</script>


<style scoped>
.wrap-tag {
  white-space: normal;
  height: auto;
  padding: 8px;
  display: inline-block;
  min-height: 35px;
  line-height: 18px;
  word-wrap: break-word;
  word-break: break-word;
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
/* .custom-btn {
 font-size: 14px;
 color: aliceblue;
} */
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
	:deep(.el-drawer__header){
		background-color: rgb(245,245,245);
		padding:0px 20px;
		height: 50px;
		/* color: #000000; */
		margin-bottom: 0px;
	}
	:deep(.el-drawer__title){
		font-size: 20px;
	}
</style>