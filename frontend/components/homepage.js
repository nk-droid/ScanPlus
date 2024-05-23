export const Homepage = {
    template: `
    <div>
      <section v-show!="video">
      <!--row 1 starts-->
        <div class="container row p-5"> 

        <div class="col-8" style="margin-left:-10px">
        <br><br><br><br>
        <H1 style="margin-left: 30px; font-size:50px;"> Translate your handwritten <br> text into a readable format, <br> with Scan Plus+</H1>
        <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:20px; margin-top: 10px;"> Create and save your prescription from any device, anywhere.</p>
        <br> 
        <button type="button" class="btn lightpurple alignscan">  <h4 style="font-size:15px; margin:3.5px; color:#515b9d;">  <router-link to="/predict" style="margin-left: 0px; color:rgb(74, 105, 133);"> Scan </router-link> </h4> </button> 

        <button type="button" class="btn lightpurple alignlogin">  <h4 style="font-size:15px; margin:3.5px; color:#515b9d;">  <router-link to="/login" style="margin-left: 0px; color:rgb(74, 105, 133);"> Login </router-link> </h4> </button> 
        
        <h4 style="font-size:15px; margin-left:110px; margin-top:-72px; color:#515b9d;">  <button type="button" class="btn white1 center" @click="embedded_video"> <a style="margin-left: 0px; color: #515b9d;"> How Does it Work? </a> </button> </h4>
        <br>
        <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:15px; margin-top:-15px;"> Don't have an account? <router-link to="/signup" style="color: #515b9d;"> Sign up for free </router-link> </p>
      </div>

      <div class="col-4" style="margin-left:40px">
        <img src="frontend/assets/home.png" width="1260" height="570" style="margin-left:-350px; margin-top:30px;"> 
      </div>

      </div>
      </section>
      <!--row 1 ends-->
    <section v-show="video">
    <br>
    
      <video width="1140" height="640" controls id="video">
        <source src="frontend/static/how_it_works.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video><button @click="embedded_video" style="margin-top:-40%;"><i class="bi bi-x-circle-fill" style="font-size:30px"></i></button>
    </section>
    
    
    <!--row 4 ends-->
    </div>
    `,

    data: function() {
        return {
            video: false
        }
    },
  
    methods: {
        embedded_video: function() {
            this.video = !this.video
            event.preventDefault()
            if (!this.video) {
            document.getElementById("video").pause()
            }
        }
    }
}
