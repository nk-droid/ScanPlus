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
        <button type="button" class="btn button-color align-button">  <h4 style="font-size:15px; margin:3.5px;">  <router-link to="/predict" class="link-style">Scan</router-link> </h4> </button> 
        <button type="button" class="btn button-color">  <h4 style="font-size:15px; margin:3.5px;">  <router-link to="/ask" class="link-style">Ask</router-link> </h4> </button> 
        
        <br>
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
