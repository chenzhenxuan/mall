<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav">
        <div slot="center">购物街</div></nav-bar>
        <tab-control class="tab-control"
         :titles="['流行','新款','精选']" @tabClick="tabClick"
         ref="tabControl"
         v-show="isTabFixed"/>
        <scroll class="content"
         ref="scroll"
          v-bind:probe-type="3" 
          @scroll="contentScroll"
         :pull-up-load="true"
         @pullingUp="loadMore"
         >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control
         :titles="['流行','新款','精选']" @tabClick="tabClick"
         ref="tabControl"/>
        <good-list :goods="goods[currentType].list"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
import NavBar from '../../components/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecomendView';
import FeatureView from './childComps/FeatureView';
import TabControl from '../../components/tabControl/TabControl';
import {getHomeMultidata,getHomeGoods} from '../../network/home';
import GoodList from '../../components/content/GoodsList';
import Scroll from '../../components/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'
export default{
    name:'home',
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        BackTop
    },
    data(){
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:1,list:[]},
                'new':{page:0,list:[]}, 
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:true,
            tabOffsetTop:0,
            isTabFixed:false
        }
    },
        created(){
        /*网络请求*/
        this.getHomeMultidata();
        //请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
        },
        mounted(){
            // 1图片加载完成的事件监听
            this.$bus.$on('itemImageLoad',()=>{
              this.$refs.scroll.scroll.refresh()
        })
        },
        methods:{
            /*事件监听 */
            tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop';
                    break;
                case 1:
                    this.currentType='new';
                    break;
                case 2:
                    this.currentType='sell';
                    break;
              }
            },
            backClick(){
                this.$refs.scroll.scroll.scrollTo(0,0,500)
            },
            contentScroll(position){
                //判断BackTop是否显示
                this.isShowBackTop=(-position.y)>500;
                //决定tabContraol是否吸顶
                this.isTabFixed=(-position.y)>this.tabOffsetTop;
            },
            loadMore(){
                this.getHomeGoods(this.currentType);
                this.$refs.scroll.scroll.refresh();
            },
            swiperImageLoad(){
                this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
            },
            /*网络请求*/
            getHomeMultidata(){
            getHomeMultidata().then(res=>{
            this.banners=res.data.data.banner.list;
            this.recommends=res.data.data.recommend.list;
        })
        },  
            getHomeGoods(type){
            const page=this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
              this.goods[type].list.push(...res.data.data.list);
              this.goods[type].page+=1;
              this.$refs.scroll.finishPullUp();
        })
      }
    }  
}
</script>
<style scoped>
   	#home {
		position: relative;
		height: 100vh;
	}
	.home-nav {
		color: #fff;
		background-color: deeppink;
   /*		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9;*/
	}
	.content {
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 44px;
		bottom: 49px;
	}
    .tab-control{
        position:relative;
        z-index:9;
    }
</style>