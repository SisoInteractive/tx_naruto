// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    create: function () {
        //  create slider
        var app_index = 1;//now Swiper inedx
        app.mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            effect : 'fade',
            mousewheelControl:"false",

            // init
            onInit: function () {
                $('.scene').eq(0).addClass('active');

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
    app.create();
});