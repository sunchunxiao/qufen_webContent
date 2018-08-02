<template>
  <div>
  	<!--<div class="app-wrap">
			<el-container>
				<el-header>
					
					<Header></Header>
				</el-header>
			</el-container>
		</div>-->
  	<div style="background-color:rgb(246,246,246) ;" >
    <div class="commmon">
      <!--左边文章-->
      <div class="common-article">
        <!--文章-->
        <div class="common-article-wrap" v-for="item in itemList">
          <div class="common-article-content">
            <div class="row row1">
              <div class="photo">
                <img slot="icon" :src="item.createUserIcon">
              </div>
              <div class="name">
                <div class="projectName"><span class="projectName-name">{{item.createUserName}} </span><span class="atten-span">/ 柚子</span></div>
                <div class="projectName-time">{{item.createTimeStr}}</div>
              </div>
              <div class="discoveryBtn">
                + 关注
              </div>
            </div>
            <div class="row row2">
              <div class="test">{{item.postTitle}}</div>
              <div v-if="item.postType==1" class="index-score">{{item.totalScore}}分</div>
            </div>
            <div class="row row3">
              <div class="discoveryContent">
                <div class="contentImg">
                  <img src="../../assets/common/1.png" />
                </div>
                <p class="row3-content">
                  {{item.postShortDesc}}
                </p>
              </div>
            </div>
            <div class="row4">
              <!--标签-->
              <div class="crack-tag1"><span class="span-name">{{item.projectCode}} </span></div>
              <span class="crack-tag2" v-if="item.tagInfos.length!=0" v-for="item1 in item.tagInfos">#{{item1.tagName}}#</span>
            </div>
          </div>
          <div class="row5">
            <div class="article-atten">
              <span class="atten-name">专业评测</span>

            </div>

            <div class="article-detail">
              <div class="detail zan">
                <img src="../../assets/common/FIND.png">
                <label>128</label>
              </div>
              <div class="detail index-preview">
                <img src="../../assets/common/zanS.png">
                <label>{{item.praiseNum}}</label>
              </div>
              <div class="detail index-preview">
                <img src="../../assets/common/preview.png">
                <label>{{item.commentsNum}}</label>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!--右边消息-->
      <div class="common-attention">
        <!--二维码-->
        <div class="attention-code attention-bag margin-bottom">
          <div class="attention-wrap">
            <div class="common-attention-code">
              <div style="padding: 7px;">
                <img src="../../../build/logo.png" />
              </div>
              <p class="common-attention-down">下载区分APP不一样的区分</p>
            </div>
          </div>
        </div>
        <!--热门项目-->
        <div class="attention-hot attention-bag margin-bottom">
          <div class="attention-wrap">
            <div class="attention-hot-title">
              <img src="../../assets/common/hot.png" />
              <span class="attention-hot-pro">热门项目</span>
            </div>
            <ul class="attenList">
              <li>
                <div class="row rowList">
                  <div class="photoList">
                    <img slot="icon" src="../../assets/login/icon2.png">
                  </div>
                  <div class="name">
                    <div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
                    <div class="projectName-timeL">18:24</div>
                  </div>
                  <div class="btnL">
                    + 关注
                  </div>
                </div>
              </li>
              <li>
                <div class="row rowList">
                  <div class="photoList">
                    <img slot="icon" src="../../assets/login/icon2.png">
                  </div>
                  <div class="name">
                    <div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
                    <div class="projectName-timeL">18:24</div>
                  </div>
                  <div class="btnL">
                    + 关注
                  </div>
                </div>
              </li>
              <li>
                <div class="row rowList">
                  <div class="photoList">
                    <img slot="icon" src="../../assets/login/icon2.png">
                  </div>
                  <div class="name">
                    <div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
                    <div class="projectName-timeL">18:24</div>
                  </div>
                  <div class="btnL">
                    + 关注
                  </div>
                </div>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <!--活跃用户-->
        <div class="attention-user attention-bag margin-bottom">
          <div class="attention-wrap">
            <div class="attention-hot-title">
              <img src="../../assets/common/user.png" />
              <span class="attention-hot-pro">活跃用户</span>
            </div>
            <ul class="attenList">
              <li>
                <div class="row rowList">
                  <div class="photoList">
                    <img slot="icon" src="../../assets/login/icon2.png">
                  </div>
                  <div class="name">
                    <div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
                    <div class="projectName-timeL">18:24</div>
                  </div>
                  <div class="btnL">
                    + 关注
                  </div>
                </div>
              </li>
              <li>
                <div class="row rowList">
                  <div class="photoList">
                    <img slot="icon" src="../../assets/login/icon2.png">
                  </div>
                  <div class="name">
                    <div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
                    <div class="projectName-timeL">18:24</div>
                  </div>
                  <div class="btnL">
                    + 关注
                  </div>
                </div>
              </li>
              <li>
                <div class="row rowList">
                  <div class="photoList">
                    <img slot="icon" src="../../assets/login/icon2.png">
                  </div>
                  <div class="name">
                    <div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
                    <div class="projectName-timeL">18:24</div>
                  </div>
                  <div class="btnL">
                    + 关注
                  </div>
                </div>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import { recommend } from '@/service/home';
  import Header from '@/components/layout/header.vue'
  export default {
    name: 'discovery',
    data() {
      return {
        value: 5,
        postImage: [],
        pageIndex: 1,
        pageSize: 10,
        itemList: [],
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        totalpage: 0,
        loading: false,
        bottomText: '',
        bottomStatus: '',
        historyData: [],
        postType: "",
        state: "",
        tagInfos: [],
        documentHeight:[]
      }
    },
    components: {
			Header
		},
    mounted() {
      this.loadPageList() //加载文章
      var documentHeight = [0];
      $(window).bind("scroll", function() {
        if($(document).scrollTop() + $(window).height() > $(document).height() - 1) {
          documentHeight.push($(document).height())
          if(documentHeight[documentHeight.length - 1] > documentHeight[documentHeight.length - 2]) {
            documentHeight[documentHeight.length - 2] = documentHeight[documentHeight.length - 2] + documentHeight[documentHeight.length - 1];
            //						$(".res-more").css("display", "none");
//						this.more()
          }
        } else {
          //					$(".res-more").css("display", "block");
        }
      })
    },
    methods: {
      loadPageList() {
        // 查询数据
        let data = {
          pageIndex: 1,
          pageSize: 10
        }
        recommend(data).then(res => {
//        console.log(res)
//        console.log(res.data.recommends.rows)
          this.itemList = res.data.recommends.rows;
          for(var i = 0; i < res.data.recommends.rows.length; i++) {
            //					 	console.log(JSON.parse( res.data.recommends.rows[i].tagInfos))
            this.tagInfos = JSON.parse(res.data.recommends.rows[i].tagInfos)
//          console.log(this.tagInfos)
            res.data.recommends.rows[i].tagInfos = this.tagInfos
            this.totalpage = Math.ceil(res.data.recommends.rowCount / this.pageSize);
          }
        })
      },
      more() {
        console.log(111)
        // 分页查询
        if(this.totalpage == 1) {
          this.pageIndex = 1;
          //					this.allLoaded = true;
        } else {
          this.pageIndex = parseInt(this.pageIndex) + 1;
          //					this.allLoaded = false;
        }
        let params = {
          pageIndex: this.pageIndex,
          pageSize: 10
        }
        //				console.log(this.pageIndex);
        recommend(params).then(res => {
          this.itemList = res.data.recommends.rows;
          for(var i = 0; i < res.data.recommends.rows.length; i++) {
            //					 	console.log(JSON.parse( res.data.recommends.rows[i].tagInfos))
            this.tagInfos = JSON.parse(res.data.recommends.rows[i].tagInfos)
            console.log(this.tagInfos)
            res.data.recommends.rows[i].tagInfos = this.tagInfos
            this.totalpage = Math.ceil(res.data.recommends.rowCount / this.pageSize);
          }

        })
      }
    }
  }
</script>
<style lang="less">
  @import '../../css/global.css';
</style>
