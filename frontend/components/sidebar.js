export const SideBar = Vue.component("sidebar", {
    template: `
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul>
                <li>
                    <router-link to="/ask"> Ask </router-link>
                </li>
                <li>
                    <router-link to="/predict"> Scan </router-link>
                </li>
            </ul>
        </div>
    </div>
    `
})