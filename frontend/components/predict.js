export const Predict = {
  template: `
    <div>
        <br> <br>
      
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

            <form @submit.prevent="onUpload">
                <div class="mb-3">
                    <label for="formFile" class="form-label">
                        Upload prescription image (.jpeg/.jpg/.png format only)
                    </label>
                    <input class="form-control" type="file" id="formFile" accept="image/png, image/jpg, image/jpeg" />
                </div>

                <button type="submit" class="btn btn-light center block margin-auto" style="display: flex; justify-content: center;">
                    <p style="color: #515b9d; margin-bottom: 0px;"> Upload </p>
                </button>
            </form> 

            {{ response }}

            <br> <br> <br> <br> <br> <br> <br>  
        </div>
    </div>
    `,

  data: function() {
    return {
      response : null
    }
  },

  methods: {
    async onUpload() {
      console.log("Upload button clicked");  // Debugging log
      const input = document.querySelector('#formFile');

      if(input.files[0] !== undefined) {
        const data_ = new FormData();
        data_.append('image', input.files[0]);

         {
          const response = await fetch('http://localhost:5000/api/upload_prescription', {
            method: 'POST',
            body: data_
          });

          const data = await response.json();
          console.log("Response from server:", data);  // Debugging log
          this.response = data.details;

            this.$router.push("/predict_result");
        }}}      
        
        }
    }
