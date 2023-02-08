var vm=new Vue(
    {
        el:".wrap",
        data:
        {
            keywords:"",//搜索关键字
            musicList:[],//歌曲列表
            musicUrl:"",//歌曲地址
            musicCover:"",//歌曲封面
            musicComments:[],//评论
            isPlayin:false,//碟片旋转
            videoUrl:""//视频地址
        },
        methods:
        {
            searchMusic:function()
            {
                var pThis=this;
                console.log(this.keywords);
                axios.get("https://autumnfish.cn/search?keywords="+this.keywords)
                .then(
                    function(response)
                    {
                        console.log(response.data.result.songs);
                        pThis.musicList=response.data.result.songs;
                    },
                    function(err)
                    {

                    }
                    )
            },
            playMusic:function(musicId)
            {
                var pThis=this;
                axios.get("https://autumnfish.cn/song/url?id="+musicId)
                .then(
                    function(response)
                    {
                        console.log(response.data.data[0].url);
                        pThis.musicUrl=response.data.data[0].url;
                    },
                    function(err)
                    {

                    }
                    );
                
                axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
                .then(
                    function(response)
                    {
                        console.log(response.data.songs[0].al.picUrl);
                        pThis.musicCover=response.data.songs[0].al.picUrl;
                    },
                    function(err)
                    {
                        
                    }
                    );
                
                axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(
                    function(response)
                    {
                        console.log(response.data.hotComments);
                        pThis.musicComments=response.data.hotComments;
                    },
                    function(err)
                    {
                            
                    }
                    );
            },
            play:function()
            {
                this.isPlayin=true;
            },
            pause:function()
            {
                this.isPlayin=false;
            },
            playVideo:function(musicId)
            {
                axios.get("https://autumnfish.cn/mv/url?id=" + musicId)
                .then(
                    function(response)
                    {
                        console.log(response.data.hotComments);
                        pThis.musicComments=response.data.hotComments;
                    },
                    function(err)
                    {
                            
                    }
                    );
            }
        }
    }
)