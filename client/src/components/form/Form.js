import React from "react";
import TextArea from "../textarea/TextArea";
import Input from "../input/Input";
import ButtonGroup from "../buttonGroup/ButtonGroup";

function Form({
  inputError,
  book,
  handleChange,
  bookSelected,
  handlePost,
  handleUpdate,
  handleDelete,
}) {
  const { title, author, description } = book;
  return (
    <div className="form-container">
      <Input
        label="Title"
        name="title"
        error={inputError.title}
        value={title}
        onChange={handleChange}
      />

      <Input
        label="Author"
        name="author"
        error={inputError.author}
        value={author}
        onChange={handleChange}
      />

      <TextArea
        label="Description"
        value={description}
        onChange={handleChange}
        error={inputError.description}
      />

      <div className="form-input">
        <ButtonGroup
          handlePost={handlePost}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          bookSelected={bookSelected}
        />
      </div>
    </div>
  );
}

export default Form;
