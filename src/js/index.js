$(function () {

// 处理列表
function loadListData(){
    return axios.get('home/goodslist');
}
// 渲染列表数据
function renderList(param){
    return new Promise(function(resolve,reject){
        let html = template('listTpl',param.data)
        $('#listInfo').html(html)
        resolve();
    });
}


// ------------------------------------------------------------
//处理菜单
function loadMenuData(){
    return axios.get('home/catitems');
}
// 渲染菜单数据
function renderMenu(param){
    return new Promise(function(resolve,reject){
        let html = template('menuTpl',{list:param.data})
        $('#menuInfo').html(html);
        resolve();
    });    
}

// -----------------------------------------------------------
    // 处理轮播图
    function loadSwiperData(){
        return axios.get('home/swiperdata');
    }
    //渲染轮播图数据
    function renderSwiper(param){
        return new Promise(function(resolve,reject){
            let html = template('swiperTpl',{list:param.data});
            $('#swiperInfo').html(html);
            resolve();
        });
    }
    //处理轮播图
    function handleSwiper() {
        return new Promise(function(resolve,reject){
         new Swiper('.swiper-container', {
            loop: true,
            autoplay:true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        })
         resolve();
     })
    }

    // 页面初始化完成之后，触发该事件
    $(document).on("pageInit", function (e, pageId, $page) {
        // 处理轮播效果
        loadSwiperData()
        .then(renderSwiper)
        .then(handleSwiper)
        .then(function(){
            $.toast('success');
        })
        .catch(function(){
            $.toast('服务器错误');
        })
        // 处理菜单
        loadMenuData()
        .then(renderMenu)
        .then(function(){
            $.toast('success')
        })
        .catch(function(){
            $.toast('服务器错误')
        })
        // 处理列表
        loadListData()
        .then(renderList)
        .then(function(){
            $.toast('success');
        })
        .catch(function(){
            $.toast('服务器错误');
        })

    });
    $.init();
});