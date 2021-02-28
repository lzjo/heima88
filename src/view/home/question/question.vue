<template>
  <div class="question">
    <el-card>
      <el-form :model="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select placeholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(item,index) in subjectData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select placeholder="请选择阶段" v-model="form.step">
                <el-option
                  v-for="(value,key,index) in stepObj"
                  :key="index"
                  :label="value"
                  :value="key"
                ></el-option>
                <!-- <el-option label="初级" value="1"></el-option>
                <el-option label="中级" value="2"></el-option>
                <el-option label="高级" value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item,index) in businessData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(value,key,index) in typeObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
                <!-- <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
                <el-option label="简答" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
                <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select placeholder="请选择状态" v-model="form.status">
                <el-option :value="0" label="禁用"></el-option>
                <el-option :value="1" label="启用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button>清除</el-button>
              <el-button type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="tableData" :border="true">
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status==0?'禁用':'启用'}}</template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button>编辑</el-button>
            <el-button>{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getsubjectdata } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
import { getquestionData } from "@/api/question.js";
export default {
  data() {
    return {
      form: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: ""
      },
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      subjectData: [],
      businessData: [],
      tableData: []
    };
  },
  created() {
    getsubjectdata({ limit: 1000 }).then(res => {
      this.subjectData = res.data.items;
      console.log("学科数据", res);
    });
    getBusinessData({ limit: 1000 }).then(res => {
      this.businessData = res.data.items;
      console.log("企业数据", res);
    });
    this.getData();
  },
  methods: {
    getData() {
      getquestionData().then(res => {
        this.tableData = res.data.items;
        console.log("题库列表数据", res);
      });
    },
    search() {
      console.log("所有数据", this.form);
    }
  }
};
</script>

<style>
</style>