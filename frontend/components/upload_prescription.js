export const UploadPrescription = {
    template: `
    <div>
    <br> <br>
      <div class="container py-5 display-4">
          <span class="badge text-bg-light block margin-auto"> <h4 class="m-0 p-0" style="font-size:15px; margin:3.5px; color:rgb(51, 51, 51);">Dr. Reddy's ScanPlus+</h4></span> 
      </div>
      
      <div class="container"> 
          <div class="col">
              <h1 style="margin-left: 30px; font-size:60px; text-align:center;">
                  ScanPlus+
              </h1>
          </div>
  
          <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:20px; margin-top: 10px; text-align:center;">
              Upload a clear picture of your prescription.
          </p>
  
          <br> <br> <br>
  
          <form>
              <div class="mb-3">
                  <label for="formFile" class="form-label">
                      Upload medicine image (.jpeg/.jpg/.png format only)
                  </label>
                  <input class="form-control" type="file" id="formFile" accept="image/png, image/jpg, image/jpeg" />
              </div>
  
              <div class="mb-3">
                  <label for="formFile" class="form-label">
                      Upload prescription image (.jpeg/.jpg/.png format only)
                  </label>
                  <input class="form-control" type="file" id="formFile" accept="image/png, image/jpg, image/jpeg" />
              </div>
  
              <button type="button" @click="onUpload" class="btn btn-light lightpurple center block margin-auto" style="display: flex; justify-content: center; color:rgb(74, 105, 133);">
                  <p style="color: #515b9d; margin-bottom: 0px;"> Upload </p>
              </button>
          
          </form> 
  
          <br> <br> <br> <br> <br> <br> <br>  
          
      </div>
      </div>
      `,
  
      methods: {
        async onUpload() {
  
          const input = document.getElementById('formFile');
          
          input.addEventListener('change', (event) => {
          var image = event.target.files[0];
          });
  
          console.log(image)
          
          if(input.files[0] !== undefined) {
            await fetch('http://ec2-13-234-19-69.ap-south-1.compute.amazonaws.com:5000/api/upload2', {
              method: 'POST',
              body: image
            })
            this.$router.go("/PredictImg")
          }
        }
    }
  }
  
  