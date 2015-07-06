// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
        before_loading_img:function(){
            var befireimg = [
                'bg.png',
                'loading-1.jpg',
                'loading-2.jpg',
                'loading-3.jpg',
                'loading-4.jpg',
                'loading-5.jpg',
                'loading-text.jpg'
            ]
            var imgPath = "assets/images/";
            var imgLength = befireimg.length;
            var loadedLength = 0;
            for (var i = 0; i < imgLength; i++) {
                var img = new Image();
                img.src = imgPath + befireimg[i];

                img.onload = function () {
                    loadedLength++;
                    /* check img load progress */
                    if( loadedLength == 7 ){
                        app.loadimg() // 加载动画结束，进行后续加载
                    }

                };
            }

        },

        loadimg: function () {
        var audioEle1 = document.getElementById("audio");
        var audioEle2 = document.getElementById("audio2");
        audioEle1.oncanplaythrough = function() {};
        audioEle2.oncanplaythrough = function() {};
        var imgSrcArr = [
            'error.png',
            'zan.png',
            'btn-2.png',
            'btn-bg.png',
            'btn-bg2.png',
            'btn.png',
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
            'p3-bg.jpg',
            'p3-A.png',
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
            'p4-yun2.jpg',
            'p4-yun4.jpg',
            'p7-06.jpg',
            'p7-01.jpg',
            'p7-02.jpg',
            'p7-03.jpg',
            'p7-04.jpg',
            'p7-05.jpg',
            'p7-btn.png',
            'p7-btn2.png',
            'p6-btn.png',
            'p6-btn2.png',
            'p6-people.jpg',
            'p7-ko.png',
            'p6-text.png',
            'p6-02.jpg'
        ];
        var imgPath = "assets/images/";
        var imgLength = imgSrcArr.length;
        var loadedLength = 0;
        var isLoaded = false;
        var loading_val = 0;
        for (var i = 0; i < imgLength; i++) {
            var img = new Image();
            img.src = imgPath + imgSrcArr[i];

            img.onload = function () {
                loadedLength++;
                if( loading_val< 68 ){
                    loading_val +=1;
                }
                if( loading_val >67 ){
                    var timenumber = 0
                    /* loading animation */
                    var settime = setInterval(function(){

                        $('.loading-text').html(timenumber+'%');
                        if( timenumber == 100 ){
                            /* check img load progress */
                            if ( checkIsAllLoaded() && isLoaded == false && timenumber > 99) {
                                isLoaded = true;
                                setTimeout(function(){
                                    $('.loading_box').hide();
                                    $('.swiper-container').fadeIn();
                                    app.create()
                                },700)

                            }
                        }
                        else{
                            timenumber += 1;
                        }
                        if( timenumber > 10 && timenumber <30 ){ $('.loading-body').attr("src",'assets/images/loading-1.jpg') }
                        if( timenumber > 30 && timenumber <50 ){ $('.loading-body').attr("src",'assets/images/loading-2.jpg') }
                        if( timenumber > 50 && timenumber <70 ){ $('.loading-body').attr("src",'assets/images/loading-3.jpg') }
                        if( timenumber > 70 && timenumber <90 ){ $('.loading-body').attr("src",'assets/images/loading-4.jpg') }
                        if( timenumber > 90 && timenumber <100 ){ $('.loading-body').attr("src",'assets/images/loading-5.jpg') }

                        if( timenumber > 100 ){
                            clearInterval(settime);
                        }

                    },20)
                }




            };
        }

        function checkIsAllLoaded () {
            return loadedLength / imgLength == 1;
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

            }
        });

        function lockSwiper(){
            app.mySwiper.lockSwipes();
        }

        //lock Swiper
        lockSwiper();


        var error_sum = -1; //初始化用户选择 -1为未选中
        //click bin
        $('.btn').hammer().bind("tap", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            error_sum = -1;
        });

        //count Sum
        var Count_sum = 0; //统计打错结果
        //replay btn
        $('.reply').hammer().bind("tap", function(){
            //console.log( app_index );
            //console.log($('.swiper-slide').eq(app_index).html())

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
                that.find('.p2-A-alert').addClass('active');
                error_sum = 0;
            }else{
                that.find('.people—img').hide();
                that.find('.B_img').fadeIn();
                that.find('.people-bg2').fadeIn();
                that.find('.p1-B-alert').addClass('active');
                that.find('.p2-A-alert').removeClass('active');
                error_sum = 1;
            }
        })

        //click btn_define
        $('.btn_define').hammer().bind("tap", function(){
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
        $('.mp3-box').hammer().bind("tap", function(){
            $(this).toggleClass('active');
            $(this).attr('src','assets/images/m-img-active.png')
            if(!audio.paused){
                $('#audio')[0].pause();
            }else{
                $('#audio')[0].play();
                $(this).attr('src','assets/images/m-img.png')
            }

        })

        //r_paly
        $('#r_paly').hammer().bind("tap", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideTo(0, 100, false);
            lockSwiper();
            error_sum=-1;
            $('.alert_box').hide();
            $('.bg_zz').hide();
            $('.reply').removeClass('active');
            $('.people—img').hide();
            $('.star').show();
            $('.p1-B-alert').removeClass('active');
            $('.p4-1-xin').show()
        })

        //提示信息弹出 click
        $('.alert_box').hammer().bind("tap", function(){
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

        $('.fx_btn2').hammer().bind("tap", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            //$('.fenx_people').hide()
            lockSwiper()
            var aodioTime = setInterval(function(){
                var audioEle2 = document.getElementById("audio2");
                audioEle2.play();
                setTimeout(function(){
                    clearInterval(aodioTime);
                },4000)

            },850)

            Count_sum++;
            console.log(Count_sum)
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
    app.before_loading_img();
});