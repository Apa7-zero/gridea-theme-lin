import {reply} from "./modular/reply/reply.js";
import {avatar,defaultAvatar} from "./modular/avatar/avatar.js";

const vue={
    components:{reply,avatar},
    data(){
        return {
            txt: '',
            list: [],
            num: 1,
            inst: null,
            instAvatar:null,
            avatar:defaultAvatar,
            reply2key:0,
            replyList:{
                id:'',
                nickname:'',
                email:'',
                website:'',
            }
        }

    },
    mounted(){
        //获取数据
        this.getData();

        //从缓存中获取数据
        const userInfo=JSON.parse(localStorage.getItem('user_info'));
        if(userInfo){
            this.avatar=(userInfo.avatar)?userInfo.avatar:'';
        }

    },
    methods:{
        //获取数据
        getData(){
            const load=layer.msg('获取评论中', {icon: 16});
            const query = new AV.Query('comment_list');
            query.equalTo('url', window.location.pathname);
            query.skip((this.num-1)*10);
            query.limit(10);
            query.descending('time');
            query.find().then((data) => {
                layer.close(load);
                if(data.length===0&&this.num!==1){
                    layer.msg('已经全部加载完了！~~');
                }

                this.list.push.apply(this.list,data);
            });
        },
        //加载更多
        loadMore(){
            this.num++;
            this.getData();
        },
        //二级评论开启
        reply2(k,id,nickname,email,website){
            this.replyList.id=id;
            this.replyList.nickname=nickname;
            this.replyList.email=email;
            this.replyList.website=website;
            this.reply2key=k;
            this.inst=new mdui.Dialog('#reply_mode',{modal:true});
            this.inst.open();
        },
        //取消回复
        reply2Close(){
            this.inst.close(true);
            this.inst=null;
        },
        //提交评论-二级评论
        reply2Submit(nickname,email,website,txt){
            this.reply2Close();
            const load=layer.msg('提交中', {icon: 16});

            //更具id获取
            const query = new AV.Query('comment_list');
            query.equalTo('objectId', this.replyList.id);
            query.first().then((data) => {
                let replySon=data.attributes.reply_son;
                replySon=JSON.parse(replySon);
                replySon.push({
                    nickname:nickname,
                    email:email,
                    website:website,
                    txt:txt,
                    img:this.avatar,
                    id:this.replyList.id,
                    time:Math.round(new Date() / 1000),
                    reply_nickname:this.replyList.nickname,
                    reply_email:this.replyList.email,
                    reply_website:this.replyList.website
                });
                const replySonLen = replySon.length-1;
                replySon=JSON.stringify(replySon);
                const update = AV.Object.createWithoutData('comment_list', this.replyList.id);
                update.set('reply_son',replySon);
                update.save();

                // 放入通知
                const notice=this.addNotice(this.replyList.id,email,this.replyList.email,1,replySonLen);
                notice.save().then();

                //其他操作
                this.cache(nickname,email,website);
                layer.close(load);
                layer.msg('评论成功！');

                //更新操作
                this.list[this.reply2key].attributes.reply_son=replySon;
            },err=>{
                console.log(err);
                alert('网络异常');
            });
        },
        //提交评论-一级评论
        replySubmit(nickname,email,website,txt){
            const load=layer.msg('提交中', {icon: 16});
            const Dao = AV.Object.extend('comment_list');
            const dao=new Dao();
            dao.set('nickname',nickname);
            dao.set('email',email);
            dao.set('website',website);
            dao.set('txt',txt);
            dao.set('reply_son','[]');
            dao.set('img',this.avatar);
            dao.set('url',window.location.pathname);
            dao.set('time',Math.round(new Date() / 1000));
            dao.save().then(res => {
                //通知集合
                const notice=this.addNotice(res.id,email,'',0,-1);
                notice.save().then(()=>{
                    layer.close(load);
                    this.cache(nickname,email,website);
                    layer.msg('提交成功！');

                    setTimeout(()=>{
                        //重新加载
                        this.num=1;
                        this.list=[];
                        this.getData();
                    },500);
                },err=>{
                    // 异常处理
                    console.log(err);
                    alert('提交失败！请联系网站管理员');
                });
            }, (error) => {
                // 异常处理
                console.log(error);
                alert('提交失败！请联系网站管理员');
            });
        },
        //缓存对应数据
        cache(nickname,email,website){
            const data={avatar:this.avatar};
            if(nickname)data.nickname=nickname;
            if(email)data.email=email;
            if(website)data.website=website;
            localStorage.setItem('user_info',JSON.stringify(data));
        },
        //开启选择头像弹窗
        avatarOpen(){
            this.instAvatar = new mdui.Dialog('#avatar_mode',{modal:true});
            this.instAvatar.open();
            $('#avatar_mode').css('height','auto');
            $('#avatar_mode').css('overflow','auto');
        },
        //关闭选择头像弹窗
        avatarClose(){
            this.instAvatar.close(true);
            this.instAvatar=null;
        },
        //选择头像
        avatarChoice(v){
            this.avatar=v;
            this.avatarClose();
        },
        //新添加一条通知集合
        addNotice(id,sendEmail,receiveEmail,type,key){
            //通知集合
            const Notice = AV.Object.extend('notice');
            const notice=new Notice();
            notice.set('send_id',id);
            notice.set('send_email',sendEmail);
            notice.set('receive_email',receiveEmail);
            notice.set('type',type);
            notice.set('is_send',0);
            notice.set('url',window.location.pathname);
            notice.set('key',key);
            notice.set('time',Math.round(new Date() / 1000));

            return notice;
        },
        time_format(str,t){
            if(!t) return '';
            t=t*1000;
            var d = new Date();
            d.setTime(t);

            var    _m = d.getMonth()+1,
                _d = d.getDate(),
                _H = d.getHours(),
                _i = d.getMinutes(),
                _s = d.getSeconds(),

                format = {
                    'Y' : d.getFullYear(),                            // 年
                    'm' : _m.toString().length == 1 ? '0'+_m : _m,    // 月
                    'd' : _d.toString().length == 1 ? '0'+_d : _d,    // 日
                    'H' : _H.toString().length == 1 ? '0'+_H : _H,    // 时
                    'i' : _i.toString().length == 1 ? '0'+_i : _i,    // 分
                    's' : _s.toString().length == 1 ? '0'+_s : _s    // 秒
                };

            for(var i in format){
                str = str.replace(new RegExp(i),format[i]);
            }

            return str;
        }
    }
};

Vue.createApp(vue).mount('#vue_app')
