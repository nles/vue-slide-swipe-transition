// depends on Vue

var template = ''
 +'<transition-group'
 +'   :name="name"'
 +'   v-on:after-enter="afterEnter"'
 +'   v-on:enter="enter"'
 +'   v-on:leave="leave"'
 +'   tag="div"'
 +'   class="slide-swipe-transition"'
 +' >'
 +'  <div class="slide-wrapper" v-for="index in slide_count" v-if="active_slide == index" :key="\'slide-\'+index">'
 +'    <slot :name="\'slide-\'+index"></slot>'
 +'  </div>'
 +'</transition-group>'

Vue.component('slide-swipe-transition', {
  template: template,
  props: {
    'name': String,
    'active_slide': { type: Number, default: 0 },
    'slide_count': { type: Number, default: 0 }
  },
  data () {
    return {
      animating: 0,
      last_slide: 0
    }
  },
  methods: {
    enter: function (el) {
      if (this.active_slide > this.last_slide) el.className+= ' animated fadeInRight'
      if (this.active_slide < this.last_slide) el.className+= ' animated fadeInLeft'
    },
    leave: function (el) {
      if (this.active_slide > this.last_slide) el.className+= ' animated fadeOutLeft'
      if (this.active_slide < this.last_slide) el.className+= ' animated fadeOutRight'
    },
    afterEnter: function (el) {
      this.$set(this, 'last_slide', this.active_slide)
    }
  }
})
