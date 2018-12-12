const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {

    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system"
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("#create()", () => {
    it("should create a post object with a title, body, and assigned topic", (done) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system"
      })
      .then((topic) => {
        expect(topic.title).toBe("Expeditions to Alpha Centauri");
        expect(topic.description).toBe("A compilation of reports from recent visits to the star system");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("#getPosts()", () => {
    it("should return the associated posts", (done) => {
      Post.create({
        title: "My first visit to Proxima Centauri b",
        body: "I saw some rocks",
        topicId: this.topic.id
      })
      .then((post) => {
        expect(post.title).toBe("My first visit to Proxima Centauri b");
        expect(post.body).toBe("I saw some rocks");
        expect(post.topicId).toBe(this.topic.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });
});
