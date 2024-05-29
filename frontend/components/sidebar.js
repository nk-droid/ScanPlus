export const SideBar = Vue.component("sidebar", {
	template: `
	<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style="width: 200px">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-flex">
            <div class="row" style="margin-left: 7%;">
                <span class="nav-options">
                    <router-link to="/predict">
                        Scan
                    </router-link>
                </span>
            </div>
            <br>
            <div class="row" style="margin-left: 7%;">
                <span class="nav-options">
                    <router-link to="/ask">
                        Ask
                    </router-link>
                </span>
            </div>
            <div class="m-2">
                Get notifications on WhatsApp.
            </div>
            <div class="m-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" shape-rendering="crispEdges" height="100px">
                    <path fill="#ffffff" d="M0 0h33v33H0z"/>
                    <path stroke="#000000" d="M0 0.5h7m2 0h1m2 0h6m1 0h1m1 0h1m1 0h2m1 0h7M0 1.5h1m5 0h1m3 0h1m2 0h2m2 0h1m8 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h4m4 0h1m2 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h3m2 0h6m1 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m3 0h1m3 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h4m1 0h4m1 0h1m1 0h1m2 0h2m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h1m1 0h2m1 0h1m1 0h1m2 0h1m2 0h4M0 8.5h1m1 0h5m2 0h1m2 0h1m1 0h4m3 0h1m1 0h2m1 0h5M0 9.5h2m1 0h1m1 0h1m1 0h3m1 0h1m2 0h3m3 0h1m1 0h5m2 0h2m1 0h1M1 10.5h1m1 0h2m1 0h2m1 0h1m2 0h1m5 0h2m1 0h1m3 0h1m2 0h1m1 0h2M1 11.5h2m1 0h1m2 0h1m3 0h2m1 0h1m4 0h1m1 0h1m4 0h1m1 0h3m1 0h1M2 12.5h2m2 0h1m1 0h1m1 0h1m7 0h2m1 0h1m2 0h6m2 0h1M0 13.5h3m2 0h1m4 0h1m1 0h6m2 0h2m1 0h1m4 0h5M0 14.5h2m1 0h2m1 0h2m5 0h1m3 0h1m1 0h1m1 0h1m1 0h3m1 0h1m2 0h2M0 15.5h1m1 0h1m1 0h1m3 0h1m1 0h2m1 0h1m2 0h6m1 0h1m1 0h2m2 0h2M4 16.5h1m1 0h2m2 0h2m1 0h2m1 0h2m1 0h1m4 0h2m1 0h2m3 0h1M5 17.5h1m1 0h3m6 0h3m1 0h1m2 0h1m2 0h2m1 0h2M0 18.5h3m1 0h1m1 0h2m2 0h1m1 0h4m1 0h1m4 0h1m3 0h1m1 0h1m1 0h2M0 19.5h4m3 0h1m1 0h2m1 0h1m1 0h2m1 0h2m7 0h1m1 0h3M0 20.5h1m2 0h4m2 0h1m1 0h1m4 0h1m2 0h7m1 0h3m1 0h2M0 21.5h3m2 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h2m4 0h1m1 0h1m2 0h1m1 0h1m1 0h1M0 22.5h1m1 0h1m1 0h1m1 0h2m1 0h1m3 0h4m1 0h1m1 0h5m2 0h2m1 0h2M0 23.5h1m2 0h2m3 0h2m1 0h5m1 0h2m4 0h3m2 0h2m2 0h1M0 24.5h1m1 0h1m1 0h5m1 0h1m1 0h1m2 0h1m4 0h2m1 0h6m2 0h2M8 25.5h1m1 0h2m2 0h1m1 0h1m1 0h1m2 0h1m2 0h1m3 0h1m1 0h2M0 26.5h7m3 0h1m2 0h2m3 0h1m2 0h1m1 0h2m1 0h1m1 0h1m1 0h3M0 27.5h1m5 0h1m1 0h8m3 0h1m1 0h4m3 0h1m1 0h1m1 0h1M0 28.5h1m1 0h3m1 0h1m1 0h1m1 0h3m2 0h1m2 0h2m1 0h1m2 0h6M0 29.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h5m2 0h1m1 0h1m4 0h3M0 30.5h1m1 0h3m1 0h1m1 0h1m1 0h3m4 0h3m1 0h3m2 0h2M0 31.5h1m5 0h1m2 0h3m1 0h1m2 0h5m1 0h1m3 0h4M0 32.5h7m1 0h1m1 0h2m4 0h2m1 0h1m1 0h1m1 0h1m2 0h6"/>
                </svg>
            </div>
            <div class="m-2">
                Scan this QR code.
            </div>
        </div>
    </div>
	`
})
