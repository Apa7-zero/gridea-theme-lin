
const ID="avatar_object";
const url="/media/img/avatar/";
const defaultAvatar=url+'user.png';
const list={
    user:'user.png',
    java:'java.png',
    ybl:'ybl.jpg',
    css:'css.png',
    html:'html.png',
    js:'js.png',
    php:'php.png',
    python:'python.png',
    qinwa:'qinwa.jpg',
    bao:'bao.png',
    cangshu:'cangshu.png',
    jing:'jing.png',
    lang:'lang.png',
    mao:'mao.png',
    niu:'niu.png',
    shayu:'shayu.png',
    shizi:'shizi.png',
    yang:'yang.png',
    zhu:"zhu.png",
    hu:'hu.png'
};
const avatar={
    data(){
        return {
            url:url,
            list:list
        }
    },
    template:document.getElementById(ID).contentWindow.document.getElementById("template"),
    methods:{
        choice(v){
            this.$emit('choice',this.url+v);
        }
    }
};

export {avatar,defaultAvatar};
