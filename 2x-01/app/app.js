export default {
    data() {
        return {};
    },
    render(h) {
        return(
            <div >
                <div style="margin:0 auto; width:400px; height:100px;">
                    <router-link to="/home">Home</router-link>
                    <router-link to="/about">About</router-link>
                </div>
                <router-view class="view"></router-view>
            </div>
        )
    }
}
