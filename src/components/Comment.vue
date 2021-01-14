<template>
  <div>
      <div class="text-left d-flex mb-1 mt-1 p-2 comment">
        <div class="col-1 p-0 pl-md-3 pr-md-3">
          <div class="rounded-circle img-profile">image</div>
        </div>
        <div class="col-11 flex-column position-relative">
          <p class="m-0"><strong>{{propsComment.name}}</strong></p>
          <p class="text-muted m-0" v-if="load === false">{{propsComment.date}}</p>
          <div class="d-flex" v-if="load === false">
                <div
                  class="m-1"
                  v-for="(index, star) in propsComment.generateStar"
                  :key="star"
                >
                  <b-icon icon="star-fill" variant="warning"></b-icon>
                </div>
              </div>
          <div class="d-flex flex-wrap">
            <img src="" alt="" srcset="">
          </div>
          <p>{{propsComment.review_comment}}</p>
          <div class="position-absolute more">
            <b-icon icon="three-dots" variant="dark" @click="moreAction" class="cursor-pointer"></b-icon>
            <div class="more-action" :style="{display: more}">
              <ul class="d-flex flex-column">
                <li class="cursor-pointer mb-1" @click.self="edit(propsComment._id)">Edit</li>
                <li class="cursor-pointer" @click.self="del(propsComment._id)">Delete</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    <div class="col-12 spacer1"></div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['propsComment', 'load'],
  data () {
    return {
      more: 'none'
    }
  },
  methods: {
    moreAction () {
      if (this.more === 'none') {
        this.more = 'flex'
      } else {
        this.more = 'none'
      }
    },
    del (id) {
      this.$emit('delete', id)
      this.moreAction()
    },
    edit (id) {
      this.$emit('edit', id)
      this.moreAction()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.img-profile {
 width: 30px;
 height: 30px;
 background: #c4c4c4;
 font-size: 8px;
 display: flex;
 justify-content: center;
 align-items: center;
}
.comment {
  background: #f5f1f1
}
.more {
  right: 0;
  top: 0;
}
.more-action {
  position: absolute;
  right: 0;
  top: 25px;
  background: #c4c4c4;
  border-radius: 10px 0px 10px 10px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
