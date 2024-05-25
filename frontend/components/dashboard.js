export const Dashboard = {
    template: `
    <div>
    <div class="page-content p-5" id="content"> 
          <div class="container py-5 display-4"> 
  
  <!--start-->
  
                             
  <!--time-->
  <div class="div16">
      <p style="color: rgb(112, 112, 112); margin-bottom: 0px; margin-left: 6px; margin-top: 4px; font-size:20%;"> &#128337; &nbsp; {{currentDateTime}}</p>
  </div>
  
  <!--time-->
  
  
  <div class="div15">
    <img src="../static/doctor1.png" height="125" width="300" style="margin-left:700px; margin-top:-11px;"> 
  
    <p style="color: #515b9d; margin-bottom: 0px; margin-left: 20px; margin-top: -97px; font-size:50%;"> Hello John Doe </p>
    <br>
    <p style="color: rgb(112, 112, 112); margin-bottom: 0px; margin-left: 20px; margin-top: -58px; font-size:28%;"> Have a nice day at work! </p>
  </div>
            
  
  <p style="color: rgb(112, 112, 112); margin-bottom: 0px; margin-left: 55px; margin-top: -20px; font-size:25%;"> We've found <b style="color: #515b9d;; margin-bottom: 0px; margin-top: 10px; font-size:90%;"> 200 </b> files to annotate</p>
  
  <br>
  
  <!--med starts-->
  <div class="div12">
  
      <!--
  
      <div class="squaremed1"> 
          <img src="../static/prescription2.png" height="90px" width="165" style="margin-left:-49px; margin-top:-15px;"> 
       </div>
       <p style="margin-left: 120px; margin-top:-78px; color: #515b9d; font-size:15px;"> Prescription 1 </p>
       <p style="margin-left: 120px; margin-top:-10px; color: #515b9d; font-size:13px;"> 25/12/22 12:00 pm </p>
       <form> <a href=""> <button type="submit" class="btn lightpurple four1">  <p style="color: #515b9d; margin-bottom: 0px; font-size:70%;"> Annotate </p></button> </a> </form> 
       <form> <a href=""> <button type="submit" class="btn lightgreen five1">  <p style="color: rgb(31, 110, 82); margin-bottom: 0px; font-size:70%;"> Delete </p></button> </a> </form> 
       -->
       <img src="../static/prescription2.png" height="90px" width="165" style="margin-left:-40px; margin-top:-5px;"> 
       <p style="margin-left: 100px; margin-top:-68px; color: #515b9d; font-size:15px;"> Prescription 1 </p>
       <p style="margin-left: 100px; margin-top:-10px; color: #515b9d; font-size:12px;"> 25/12/22 12:00 pm </p>
       <form> <a href=""> <button type="submit" class="btn lightpurple four1">  <p style="color: #515b9d; margin-bottom: 0px; font-size:70%;"> Annotate </p></button> </a> </form> 
       <form> <a href=""> <button type="submit" class="btn lightgreen five1">  <p style="color: rgb(31, 110, 82); margin-bottom: 0px; font-size:70%;"> Delete </p></button> </a> </form> 
  
  </div>
  
  <!--med ends-->
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
            <!--end-->
          </div> 
   </div>   <!--column end -->   
    </div>
    `,
  
    data: function() {
      return {
        Prescriptions: [],
        Date: [],
        name: "",
        currentDateTime: null
      }
    },
    
    mounted() {
      setInterval(() => {
        let options = {  
          weekday: "long", year: "numeric", month: "short",  
          day: "numeric", hour: "2-digit", minute: "2-digit"  
        };
        let date = new Date()
        this.currentDateTime = date.toLocaleTimeString("en-us", options);
      }, 1000);
    },
  
    beforeMount() {
        fetch('http://ec2-13-234-19-69.ap-south-1.compute.amazonaws.com:5000/api/dashboard', {
            method: "GET"
        }).then(res => res.json())
          .then(resp =>  {
          this.Prescriptions = resp.prescriptions,
          this.Date = resp.date,
          this.name = resp.name
        })
    },
  
    methods: {
      annotate: function(prescription) {
  
        fetch(`http://ec2-13-234-19-69.ap-south-1.compute.amazonaws.com:5000/api/annotatefile/${prescription}`, {
          method: "GET"
        }).then(res => res.json())
          .then(resp => connsole.log(resp))
          this.$router.push('/annotator')   
      },
  
      dlt: function(prescription) {
        const swalWithBootstrapButtons = Swal.mixin({
          buttonsStyling: true
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'No, cancel!',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then((result) => {
              fetch(`http://ec2-13-234-19-69.ap-south-1.compute.amazonaws.com:5000/api/deletefile/${prescription}`, {
              method: "GET"
              })
            }).then(res => res.json())
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              prescription+' is safe :)',
              'error'
            )
          }
        })     
      }
    }
  }