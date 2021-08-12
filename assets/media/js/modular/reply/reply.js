import {emoji,emojis} from '../emoji/emoji.js';

const ID="reply_object";
const reply={
    components:{emoji},
    data(){
        return {
            k:true,
            nickname:'',
            email:'',
            website:'',
            txt:''
        };
    },
    template:document.getElementById(ID).contentWindow.document.getElementById("template"),
    mounted(){
        //从缓存中获取数据
        const userInfo=JSON.parse(localStorage.getItem('user_info'));
        if(userInfo){
            this.nickname=(userInfo.nickname)?userInfo.nickname:'';
            this.email=(userInfo.email)?userInfo.email:'';
            this.website=(userInfo.website)?userInfo.website:'';
        }
    },
    methods:{
        getData(){
            //获取昵称
            if(!this.nickname){
                // mdui.alert("大佬，名字还是要留下的哦~",()=>{}, {confirmText:'确定'});
                mdui.snackbar({message:'大佬，名字还是要留下的哦~',position:'top'})
                return;
            }
            //邮箱
            const regEmail=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
            if(this.email&&!regEmail.test(this.email)){
                // mdui.alert("大佬，既然填写了                                  邮箱就要写对哈~",()=>{}, {confirmText:'确定'});
                mdui.snackbar({message:'大佬，既然填写了邮箱就要写对哈~',position:'top'})
                return;
            }
            //网址
            const regWebsite=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
            if(this.website&&!regWebsite.test(this.website)){
                // mdui.alert("大佬，既然填写了网址就要写对哈~",()=>{}, {confirmText:'确定'});
                mdui.snackbar({message:'大佬，既然填写了网址就要写对哈~',position:'top'})
                return;
            }
            //评论的内容
            if(!this.txt){
                // mdui.alert("大佬，评论还是要写的~",()=>{}, {confirmText:'确定'});
                mdui.snackbar({message:'大佬，评论还是要写的~',position:'top'})
                return;
            }
            const newTxt=this.txtEncode();

            //交给父组件
            this.$emit('submit',this.nickname,this.email,this.website,newTxt);
            this.txt="";
        },
        emojisChoice(k){
            this.txt+="${"+k+"}";
        },
        emojisButton(){
            this.k=!this.k;
            // this.$refs.emoji.emojisButton();
        },
        txtEncode(){
            let newTxt="";
            const txtArray=this.txt.split("");
            for(let i = 0; txtArray.length>i; i++) {
                if(txtArray[i]!=='$'){
                    //不是标签开始符号直接不处理
                    newTxt+=txtArray[i];
                    continue;
                }
                //查看第下一个字符是不是“{”
                if (txtArray.length<=i+1||txtArray[i+1]!=="{"){
                    //不是“{”跳过不处理
                    newTxt+=txtArray[i];
                    continue;
                }

                //循环读取
                let isRead=false;
                let emojiKey="";
                let endI=0;
                for(let ii=i+2;txtArray.length>ii;ii++){
                    if(txtArray[ii]==='}'){
                        //读取完毕结束循环
                        isRead=true;
                        endI=ii;
                        break;
                    }
                    emojiKey+=txtArray[ii];
                }

                //查看是否读取到表情
                if (isRead===false){
                    //没有读取到直接下一次循环
                    newTxt+=txtArray[i];
                    continue;
                }
                //读取到从表情列表中获取
                if(!emojis[emojiKey]){
                    //没有读取到对应表情直接下一次循环
                    newTxt+=txtArray[i];
                    continue;
                }

                //替换文本
                newTxt+="<img referrerpolicy=\"no-referrer\" width='30' height='30' src='"+emojis[emojiKey]+"' />";
                //将i标记成新下标
                i=endI;
            }

            return newTxt;
        }
    }
};

export {reply};
