const ID="emoji_object";
const emojis={
    "zanghu": "https://i0.hdslb.com/bfs/emote/6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
    "doge": "https://i0.hdslb.com/bfs/emote/3087d273a78ccaff4bb1e9972e2ba2a7583c9f11.png",
    "waizui": "https://i0.hdslb.com/bfs/emote/4384050fbab0586259acdd170b510fe262f08a17.png",
    "tiaopi": "https://i0.hdslb.com/bfs/emote/8290b7308325e3179d2154327c85640af1528617.png",
    "keguazi": "https://i0.hdslb.com/bfs/emote/28a91da1685d90124cfeead74622e1ebb417c0eb.png",
    "kuxiao": "https://i0.hdslb.com/bfs/emote/c3043ba94babf824dea03ce500d0e73763bf4f40.png",
    "tuodandoge": "https://i0.hdslb.com/bfs/emote/bf7e00ecab02171f8461ee8cf439c73db9797748.png",
    "geixinxin": "https://i0.hdslb.com/bfs/emote/1597302b98827463f5b75c7cac1f29ea6ce572c4.png",
    "dudu": "https://i0.hdslb.com/bfs/emote/abd7404537d8162720ccbba9e0a8cdf75547e07a.png",
    "xihuan": "https://i0.hdslb.com/bfs/emote/8a10a4d73a89f665feff3d46ca56e83dc68f9eb8.png",
    "suanle": "https://i0.hdslb.com/bfs/emote/92b1c8cbceea3ae0e8e32253ea414783e8ba7806.png",
    "ohu": "https://i0.hdslb.com/bfs/emote/362bded07ea5434886271d23fa25f5d85d8af06c.png",
    "xianiq": "https://i0.hdslb.com/bfs/emote/de4c0783aaa60ec03de0a2b90858927bfad7154b.png",
    "daku": "https://i0.hdslb.com/bfs/emote/2caafee2e5db4db72104650d87810cc2c123fc86.png",
    "haixiu": "https://i0.hdslb.com/bfs/emote/9d2ec4e1fbd6cb1b4d12d2bbbdd124ccb83ddfda.png",
    "yihuo": "https://i0.hdslb.com/bfs/emote/b7840db4b1f9f4726b7cb23c0972720c1698d661.png",
    "xijierqi": "https://i0.hdslb.com/bfs/emote/485a7e0c01c2d70707daae53bee4a9e2e31ef1ed.png",
    "jianxiao": "https://i0.hdslb.com/bfs/emote/bb84906573472f0a84cebad1e9000eb6164a6f5a.png",
    "xiao": "https://i0.hdslb.com/bfs/emote/81edf17314cea3b48674312b4364df44d5c01f17.png",
    "touxiao": "https://i0.hdslb.com/bfs/emote/6c49d226e76c42cd8002abc47b3112bc5a92f66a.png",
    "jingya": "https://i0.hdslb.com/bfs/emote/f8e9a59cad52ae1a19622805696a35f0a0d853f3.png",
    "wulian": "https://i0.hdslb.com/bfs/emote/6921bb43f0c634870b92f4a8ad41dada94a5296d.png",
    "yinglian": "https://i0.hdslb.com/bfs/emote/ba8d5f8e7d136d59aab52c40fd3b8a43419eb03c.png",
    "jiong": "https://i0.hdslb.com/bfs/emote/12e41d357a9807cc80ef1e1ed258127fcc791424.png",
    "dai": "https://i0.hdslb.com/bfs/emote/33ad6000d9f9f168a0976bc60937786f239e5d8c.png",
    "koubi": "https://i0.hdslb.com/bfs/emote/cb89184c97e3f6d50acfd7961c313ce50360d70f.png",
    "daxiao": "https://i0.hdslb.com/bfs/emote/ca94ad1c7e6dac895eb5b33b7836b634c614d1c0.png",
    "jingxi": "https://i0.hdslb.com/bfs/emote/0afecaf3a3499479af946f29749e1a6c285b6f65.png",
    "wuyu": "https://i0.hdslb.com/bfs/emote/44667b7d9349957e903b1b62cb91fb9b13720f04.png",
    "dianzan": "https://i0.hdslb.com/bfs/emote/1a67265993913f4c35d15a6028a30724e83e7d35.png",
    "guzhang": "https://i0.hdslb.com/bfs/emote/895d1fc616b4b6c830cf96012880818c0e1de00d.png",
    "ganga": "https://i0.hdslb.com/bfs/emote/cb321684ed5ce6eacdc2699092ab8fe7679e4fda.png",
    "linghunchuqiao": "https://i0.hdslb.com/bfs/emote/43d3db7d97343c01b47e22cfabeca84b4251f35a.png",
    "weiqu": "https://i0.hdslb.com/bfs/emote/d2f26cbdd6c96960320af03f5514c5b524990840.png",
    "aojiao": "https://i0.hdslb.com/bfs/emote/010540d0f61220a0db4922e4a679a1d8eca94f4e.png"
};
const emoji={
    // 接收父组件传递过来的参
    name:'emoji',
    data() {
        return {
            emojisStyle:{
                display:'inline'
            },
            emojis:emojis
        }
    },
    template:document.getElementById(ID).contentWindow.document.getElementById("template"),
    methods: {
        emojisChoice(k) {
            this.$emit("emojis_choice",k);
        },
        emojisButton(){
            this.emojisStyle.display=(this.emojisStyle.display==="none")?"inline":"none";
        }
    }
};

export {emoji,emojis};