export const PredictResult = {
    template: `
    <div>
    <br><br><br><br>
      <div class="jumbotron p-5" v-if="txt">
        <!-- Row 1 starts -->
        <!-- Row 1 ends -->
        <!-- Row 2 starts -->
        <div class="row">
          <div class="col-3"> </div> <!-- row2 col 1-->
          <div class="col-6">
            <!-- row2 col 2-->
          </div>
          <div class="col-3"> </div>
          <!--row2 col3-->
        </div>
        <!-- Row 2 ends -->
        <!-- Row 3 starts -->
        <div class="row">
          <div class="col-3"><img :src="file" alt="Prescription" width="500" height="600"> </div>
          <!-- row2 col 1-->

          <div class="col"> </div>
          <div class="col-7">
            <div class="row">
              <div class="row">
                <div class="form-group purple-border">
                  <p style="text-align:center;" v-html="txt">
                  </p>
                </div>
              </div>
              <br><br><br><br><br><br><br>
            </div>

            <!-- row4 col2 ends-->

            <div class="col-3"> </div> <!-- row 4 col3-->
          </div>
        <!-- row 4 ends-->
        </div>
      </div>
      <div v-else>
        <div class="content">
          <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <!--jumbotron ends-->
    </div>
    `,
    
    data: function() {
        return {
          txt: "",
          file: "",
          dict: "",
          token: localStorage.getItem("authentication_token")
        }
    },

    beforeMount() {
      function process(text, s) {
        new1 = ""
            var basearray = Object.keys(s)
            var max_idx = 0
            basearray.forEach(function(j) {
                for (i=0;i<s[j].length;i++) {
                    if (i==0) {
                        new1 += '<span style="color: #515b9d;">'+
                                      text.slice(0,s[j][i][1][0])
                                  +'</span>'
                    } else {
                        new1 += '<span style="color: #515b9d;">'+
                                      text.slice(s[j][i-1][1][1]+1,s[j][i][1][0])
                                  +'</span>'
                    }
                    var temp = text.slice(s[j][i][1][0], s[j][i][1][1]+1)
                    new1 += temp.replace(temp, 
                            '<span style="background-color: #b1b4dc;\
                                          display: inline-grid;\
                                          text-align: center;\
                                          border-radius: 4px;\
                                          margin: 0 2px 5px 2px;\
                                          padding: 1px;">'+
                                '<span style="font-size: 14px;\
                                              color: #515b9d;\
                                              line-height: 24px;\
                                              background: #f1f2f3;\
                                              border-width: medium;\
                                              text-align: center;\
                                              font-weight: 400;\
                                              border-radius: 5px;\
                                              padding: 2px 5px;\
                                              display: block;\
                                              margin: 3px 2px;">'+
                                    temp
                                +'</span>'+
                                '<span style="font-size: 14px;\
                                              line-height: 24px;\
                                              color: #ffffff;\
                                              text-transform: uppercase;\
                                              font-weight: 500;\
                                              display: block;\
                                              padding: 3px 5px;">'+
                                    j+
                                '</span>'+
                            '</span>'
                            )

                    if (max_idx < s[j][i][1][1]) {
                      max_idx = s[j][i][1][1]
                    }
                }
            })            
        return new1 + '<span style="color: #515b9d;">'+text.slice(max_idx+1)+'</span>'
    }
        fetch('http://ec2-13-234-19-69.ap-south-1.compute.amazonaws.com:5000/api/annotate', {
            method: "GET",
            headers: {
              "Authentication-Token": localStorage.getItem("authentication_token")
            }
        }).then(res => res.json())
          .then(resp => {
            this.txt = process(resp.msg, resp.dic),
            this.file = resp.file
          }) 
    }
}

