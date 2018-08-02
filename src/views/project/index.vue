<template>
  <div style="background-color:rgb(246,246,246) ;">
    <div class="commmon">
      <!--左边部分-->
      <div class="common-article">
        <!---->
        <div class="common-article-wrap" >
          <div class="common-article-content">
            <div>
							
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
                <label>11</label>
              </div>
              <div class="detail index-preview">
                <img src="../../assets/common/preview.png">
                <label>22</label>
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
</template>

<script>
  import { recommend } from '@/service/home';
  export default {
    name: 'discovery',
    data() {
      return {

      }
    },
    created(){

    },
    mounted() {

    },
    methods: {

    }
  }
</script>
<style lang="less">
  @import '../../css/global.css';
</style>
