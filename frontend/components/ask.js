export const Ask = {
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
            Ask any questions about your medications and health!

            </p>

            <br> <br> <br>

            <form @submit.prevent="ask_query">

            <div class="mb-3 w-50 mx-auto">
            <div class="input-group mb-3">
                <input type="text" v-model="query" class="form-control" placeholder="Message ScanPlus" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Send</button>
            </div>
            </div>
            
            </form> 
<br>

<div class="mb-3 w-50 mx-auto">
           <p> {{ result }} </p>
</div>
            <br> <br> <br> <br> <br> <br> <br>  
            
        </div>
    </div>
    `,

  data: function() {
    return {
      query: null,
      result: null
    }
  },

  methods: {
    ask_query() {
      const data = {
        query: this.query
      }
      fetch('http://localhost:5000/api/askme', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.result = data.answer
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
}
