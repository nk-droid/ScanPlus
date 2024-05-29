export const Homepage = {
    template: `
    <div>
      <!--row 1 starts-->
        <div class="container row p-5"> 
        
        <div class="col-8" style="margin-left:-10px">
        <br><br><br><br>
        <H1 style="margin-left: 30px; font-size:50px;"> Translate your handwritten <br> text into a readable format, <br> with Scan Plus+</H1>
        <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:20px; margin-top: 10px;"> Create and save your prescription from any device, anywhere.</p>
        <br> 
        <router-link to="/predict" class="btn btn-secondary link-style button-color" style="margin-left: 30px;">Scan</router-link> 
         <router-link to="/ask" class="btn btn-secondary link-style button-color">Ask</router-link>
         
        <br> <br>
        <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:15px; margin-top:-15px;"> Already have an account? <router-link to="/login" style="color: #515b9d;"> Login </router-link> </p>
      
      </div>

      <div class="col-4" style="margin-left:0px">
        <img src="frontend/assets/home.png" width="1260" height="570" style="margin-left:-350px; margin-top:30px;"> 
      </div>

      </div>
      </section>
      <!--row 1 ends-->
    
    
    
    <!--row 4 ends-->
    </div>
    `,
}
