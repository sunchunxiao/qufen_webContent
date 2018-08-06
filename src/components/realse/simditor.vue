<template>
  <textarea :id="textnames">
    <p>{{value}}</p>
</textarea>
</template>

<script>
import Simditor from 'simditor'
import '../../assets/styles/simditor.css'
import { upload } from '@/service/publish'
import { getCookie} from '../../assets/js/cookie.js'


  export default {
//    props: ['value'],
    data() {
      return {
        textnames: 'simditor',//这里防止多个富文本发生冲突
        editor: '',//保存simditor对象
        toolbar: ['title','bold', 'italic', 'underline','|', 'strikethrough',
          'fontScale','color', '|', 'ol', 'ul', 'blockquote', '|', 'link', 'image', '|', 'indent', 'outdent', 'alignment'
        ],//自定义工具栏
        value: "",
        token:getCookie('token'),
        userId:"",
        date2:"",
        uptoken:{},
        imgurl:""
      }
    },

    mounted() {

      this.$nextTick(function () {
        this.createEditor()

      })
      //获取七牛云token和用户id
			this.getToken();

    },
    methods: {

    	getToken() {
				let data1 = {
					token: this.token
				}
				var  _this = this
				upload(data1).then(res => {
					if(res.code == 0) {
//						console.log(res)
						this.uptoken.token = res.data.upToken
						this.userId = res.data.uid
						localStorage.setItem("upToken",res.data.upToken)
						localStorage.setItem("userId",this.userId)
					}
				}).catch(function(res) {
					alert(res.msg)
					if(res.msg=="用户未登录, 请重新登录"){
						_this.$router.push('/user/register')
					}
			});
			},
      createEditor() {

        var _this = this
        this.editor = new Simditor({
          textarea: document.getElementById(this.textnames),
          toolbar: _this.toolbar,
          upload:
          {
	         url: "https://upload-z2.qiniup.com",

             // url: "http://192.168.10.151:803/kff/upload/postPicsf", //文件上传的接口地址
            params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey: 'file', //服务器端获取文件数据的参数名
            connectionCount: 200,//同时上传个数
            leaveConfirm: '正在上传文件'
          },
          success: function(data) {
              console.log(data)
           },
          pasteImage: true,//是否允许粘贴上传图片，依赖 upload 选项，仅支持 Firefox 和 Chrome 浏览器。
          tabIndent: true,//是否在编辑器中使用 tab 键来缩进
        });
        this.editor.on("valuechanged", function (e, src) {
          _this.value = _this.editor.getValue()
        })//valuechanged是simditor自带获取值得方法
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.simditor{
		width: 85%;

	}
	.simditor .simditor-body img, .editor-style img{
		max-width: 100%;
		height: 100%;
	}

</style>
