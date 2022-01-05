export default class CategoryData {
  data = [];

  constructor(){
    this.setState([
      "HTML",
      "CSS",
      "JavaScript",
      "Typecript",
      "React",
      "Vue",
      "NextJS",
      "NodeJS",
      "Python",
      "Java",
      "C++",
      "Kotlin",
      "Swift",
      "Flutter",
    ]);
  }

  setState(nextData) {
    this.data = nextData;
  }

  getData(){
    return this.data;
  }
}
