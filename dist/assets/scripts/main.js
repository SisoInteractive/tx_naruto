// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    loadimg: function () {
        var imgSrcArr = [
            'bg.png',
            'btn-2.png',
            'btn-bg.png',
            'btn-bg2.png',
            'btn.png',
            'error.png',
            'hengfu.png',
            'index.jpg',
            'lm01-2.png',
            'lm01.png',
            'lm02-1.png',
            'logo.png',
            'm-img.png',
            'mz01.png',
            'mz02.png',
            'p1-1.png',
            'p1-A.png',
            'p1-alert-text.jpg',
            'p1-B-alert.png',
            'p1-B.png',
            'p1-bg.jpg',
            'p1-title.png',
            'p2-1.png',
            'p2-A.png',
            'p2-alert-text.jpg',
            'p2-B.png',
            'p2-bg.jpg',
            'p2-title.png',
            'p3-1.png',
            'p3-A.jpg',
            'p3-alert-text.jpg',
            'p3-B.jpg',
            'p3-title.png',
            'p4-1.png',
            'p4-A.png',
            'p4-alert-text.jpg',
            'p4-B-alert.png',
            'p4-B.png',
            'p4-bg.jpg',
            'p4-title.png',
            'p6-bg.png',
            'p6-text.png',
            'sy01-1.png',
            'sy01.png',
            'sy02-1.png',
            'sy02.png',
            'xh01-1.png',
            'xh01.png',
            'xh02-1.png',
            'xh02.png',
            'yun-l.png',
            'yun-r.png',
            'zan.png'
        ];
        var imgPath = "assets/images/";
        var imgLength = imgSrcArr.length;
        var loadedLength = 0;
        var isLoaded = false;

        for (var i = 0; i < imgLength; i++) {
            var img = new Image();
            img.src = imgPath + imgSrcArr[i];

            img.onload = function () {
                loadedLength++;

                /* check img load progress */
                if (checkIsAllLoaded() && isLoaded == false) {
                    var runningTimerEnd = new Date();
                    isLoaded = true;
                    app.create();
                    $('.swiper-container').fadeIn();
                }

            };
        }

        function checkIsAllLoaded () {
            var loadedRate = 0.8;
            return loadedLength / imgLength <= imgLength*loadedRate;
        }
    },

    create: function () {
        //load img

        //  create slider
        var app_index = 1;//now Swiper inedx
        app.mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            effect : 'fade',
            mousewheelControl:"false",

            // init
            onInit: function () {
                //$('.scene').eq(0).addClass('active');

            },

            //  router
            onTransitionEnd: function (swiper) {

            }
        });

        function lockSwiper(){
            app.mySwiper.lockSwipes();
        }

        //lock Swiper
        lockSwiper();

        //解决click 延迟事件
        FastClick.attach(document.body);


        var error_sum = -1; //初始化用户选择 -1为未选中
        //click bin
        $('.btn').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            error_sum = -1;
        })

        //count Sum
        var Count_sum = 0; //统计打错结果
        //replay btn
        $('.reply').click(function(){
            console.log( app_index );

            console.log($('.swiper-slide').eq(app_index).html())

            var that = $(this).parent();
            var This = $(this);
            that.find('.reply').removeClass('active');
            $('.active-text').hide();
            This.find('.active-text').show();
            $(this).addClass('active');
            if($(this).hasClass('dn_l')){
                that.find('.people—img').hide();
                that.find('.A_img').fadeIn();
                that.find('.p1-B-alert').removeClass('active');
                error_sum = 0;
            }else{
                that.find('.people—img').hide();
                that.find('.B_img').fadeIn();
                that.find('.p1-B-alert').addClass('active');
                error_sum = 1;
            }
        })

        //click btn_define
        $('.btn_define').click(function(){

            var that = $(this).parent();

            if(error_sum!=-1){

                if(error_sum==0){
                    that.find('.bg_zz').fadeIn();
                    that.find('.true_box').fadeIn();
                }else{
                    Count_sum += error_sum;
                    that.find('.bg_zz').fadeIn();
                    that.find('.false_box').fadeIn();
                }
            };

            var false_box_dspaly = that.find('.false_box').css('display')
            if( false_box_dspaly == 'block' ){
                var audioEle2 = document.getElementById("audio2");
                audioEle2.play();
            }

        })
        //click mp3 box
        $('.mp3-box').click(function(){
            $(this).toggleClass('active');
            if(!audio.paused){
                $('#audio')[0].pause();
            }else{
                $('#audio')[0].play();
            }

        })


        //提示信息弹出 click
        $('.alert_box').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            app_index = app.mySwiper.activeIndex;

            error_sum = -1;
            $('.tishi').html( Count_sum )
            if(Count_sum == 0){
                $('#title').html('!作为一个资深火影迷,我竟然全部答对了')
            }else{
                $('#title').html('太羞耻了!作为一个资深火影迷,我竟然被岸本老师亲手打了'+ Count_sum + '巴掌')
            }

        })

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);



    }
}
$(function (){
    // init app
    app.loadimg();
});