<template>
  <div>
    <ul>
      <li v-for="story in stories" :key="story._id">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h1 class="title"><a :href="story.href">{{ story.headline }}</a></h1>
              <h4 class="is-size-6">by {{ story.author }}</h4>
              <p class="is-size-4">{{ story.body }}</p>
            </div>
            <article class="media" v-for="note in notes" v-if="note.storyId == story._id" :key="note._id">
              <figure class="media-left">
                <p class="image is-48x48">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">{{ note.body }}</div>
              </div>
              <div class="media-right">
                <button @click.prevent="deleteComment(note._id)" class="delete"></button>
              </div>
            </article>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <form @submit.prevent="postComment(story._id)">
              <Field>
                <textarea class="textarea" rows="3" v-model="newComment[story._id]" slot="input" placeholder="Leave a comment"></textarea>
              </Field>
              <Field>
                <button type="submit" class="button is-link" slot="input">Submit</button>
              </Field>
            </form>
          </div>
        </article>
        <br>
        <br>
      </li>
    </ul>
  </div>
</template>

<script>
import Field from './components/form/Field.vue';
export default {
  components: {
    Field
  },
  methods: {
    postComment(storyId) {
      this.$http.post('/api/note/' + storyId, {body: this.newComment[storyId]})
      .then(response => {
        this.fetchComments();
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
      this.newComment[storyId] = '';
    },
    deleteComment(commentId) {
      this.$http.delete('/api/notes/' + commentId)
      .then(response => {
        this.fetchComments();
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    fetchStories() {
      this.$http.get('/api/stories')
      .then(response => {
        this.stories = response.body;
      })
      .catch(response => {
        console.error(response);
      });
    },
    fetchComments() {
    this.$http.get('/api/notes')
    .then(response => {
      this.notes = response.body;
    })
    .catch(response => {
      console.error(response);
    });
    }
  },
  data() {
    return {
      stories: [],
      notes: [],
      newComment: {}
    }
  },
  created() {
    this.fetchStories();
    this.fetchComments();
  }
}
</script>
