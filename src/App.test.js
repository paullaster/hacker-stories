import * as React from "react";
import App, {
  getTitle,
  storiesReducer,
  InputWithLabel,
  List,
  Item,
  Button,
  SearchForm,
  getSumComments
} from "./App";

describe("something truthy and falsy", () => {
  test("true to be true", () => {
    expect(true).toBeTruthy();
  });

  test("false to be false", () => {
    expect(false).toBeFalsy();
  });
});

describe("App component", () => {
  test("remove item when clicking remove item button", () => {});
  test("request some initial stories from API", () => {});
});

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0
};
const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1
};

const stories = [storyOne, storyTwo];
describe("storiesReducer", () => {});
