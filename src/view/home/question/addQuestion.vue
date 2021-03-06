<template>
  <el-dialog :visible.sync="dialogVisible" :fullscreen="true" class="addQuestion">
    <div slot="title" class="title">{{mode=="add"?'新增试题':'编辑试题'}}</div>
    <el-form :model="form" class="form" label-width="120px" :rules="rules" ref="form">
      <el-form-item label="学科" prop="subject">
        <el-select placeholder="请选择学科" v-model="form.subject" class="widthchange">
          <el-option
            v-for="(item,index) in subjectData"
            :key="index"
            :label="item.name"
            :value="item.id"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select v-model="form.step" placeholder="请选择阶段" class="widthchange">
          <el-option v-for="(value,key,index) in stepObj" :key="index" :label="value" :value="+key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select placeholder="请选择企业" class="widthchange" v-model="form.enterprise">
          <el-option
            v-for="(item,index) in businessData"
            :key="index"
            :label="item.name"
            :value="item.id"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-cascader
          class="widthchange"
          placeholder="请选择地区"
          v-model="form.city"
          :options="options"
          @change="handleChange"
          :props="{value:'label'}"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(value,key,index) in typeObj" :key="index" :label="+key">{{value}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio v-for="(value,key,index) in difficultyObj" :key="index" :label="+key">{{value}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr />
      <el-form-item label="试题标题" prop="title" class="setmargin">
        <quillEditor
          v-model="form.title"
          :options="{placeholder:'请在这里输入。。。'}"
          @change="textchange('title')"
        ></quillEditor>
      </el-form-item>
      <el-form-item
        :label="typeObj[form.type]"
        :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]"
      >
        <allSelect :form="form" class="allselect" @change="allselectchange"></allSelect>
      </el-form-item>
      <hr class="hrheight" />
      <el-form-item label="解析视频">
        <upload v-model="form.video" type="video"></upload>
      </el-form-item>
      <el-form-item label="答案解析" prop="answer_analyze" class="setmargin">
        <quillEditor
          v-model="form.answer_analyze"
          :options="{placeholder:'请在这里输入。。。'}"
          @change="textchange('answer_analyze')"
        ></quillEditor>
      </el-form-item>
      <hr class="hrheight" />
      <el-form-item label="试题备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
// 引入样式，此时样式是直接从quill文件中直接引入
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { regionData } from "element-china-area-data";
import allSelect from "./allSelect.vue";
import upload from "./upload.vue";
import { addquestionData, editquestionData } from "@/api/question.js";
export default {
  components: {
    quillEditor,
    allSelect,
    upload
  },
  props: [
    "subjectData",
    "stepObj",
    "businessData",
    "typeObj",
    "difficultyObj",
    "mode"
  ],
  data() {
    return {
      dialogVisible: false,
      options: regionData,
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "change" }],
        single_select_answer: [
          { required: true, message: "请选择单选答案", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "请选择多选答案", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "请输入简答题答案", trigger: "change" }
        ],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请输入答案备注", trigger: "change" }
        ]
      },
      form: {
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: 1,
        title: "",
        difficulty: 1,
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      }
    };
  },
  watch: {
    dialogVisible(newval) {
      if (newval == true) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    //题型验证
    allselectchange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    },
    //富文本验证
    textchange(str) {
      this.$refs.form.validateField(str);
    },
    //城市数据
    handleChange(val) {
      console.log(val);
    },
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addquestionData(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogVisible = false;
              this.$emit("addsearch");
            });
          } else {
            console.log("ccccc", this.form);
            let _params = JSON.parse(JSON.stringify(this.form));
            _params.city = _params.city.join(",");
            editquestionData(_params).then(() => {
              this.$message.success("编辑成功");
              this.dialogVisible = false;
              this.$emit("addsearch");
            });
          }
        }
      });
      console.log(this.form.short_answer);
    }
  }
};
</script>

<style lang="less">
.addQuestion {
  .title {
    background: skyblue;
    color: white;
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
  }
  .allselect {
    .el-input__inner {
      border-color: #dcdfe6;
    }
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .footer {
    text-align: center;
  }
  .form {
    width: 832px;
    margin: 0 auto;
    .widthchange {
      width: 600px;
    }
    .setmargin {
      .el-form-item__content {
        margin-top: 40px;
        margin-left: 0px !important;
      }
    }
    .hrheight {
      margin-bottom: 20px;
    }
  }
}
</style>