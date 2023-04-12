import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ToolForm.scss';
import Card from '../../card/Card';

const ToolEditForm = ({
  tool,
  description,
  setDescription,
  handleInputChange,
  saveTool,
}) => {
  return (
    <div className="tool-form">
      <Card cardClass={'card'}>
        <form onSubmit={saveTool}>
          {/* Maybe remove toolid later and replace with generated sku? */}
          <label>Tool ID:</label>
          <input
            type="text"
            placeholder="Tool ID"
            name="toolId"
            value={tool?.toolId}
            // onChange={handleInputChange}
            // readOnly
            disabled
          />
          <label>Tool Name:</label>
          <input
            type="text"
            placeholder="Tool name"
            name="name"
            value={tool?.name}
            onChange={handleInputChange}
          />
          <label>Tool Type:</label>
          <input
            type="text"
            placeholder="Tool Type"
            name="toolType"
            value={tool?.toolType}
            onChange={handleInputChange}
          />
          <label>Tool Price:</label>
          <input
            type="text"
            placeholder="Tool Price"
            name="price"
            value={tool?.price}
            onChange={handleInputChange}
          />
          <label>Quantity:</label>
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            name="quantity"
            value={tool?.quantity}
            onChange={handleInputChange}
          />
          <label>Tool Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ToolEditForm.modules}
            formats={ToolEditForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Tool
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// react quill rich text editor
ToolEditForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};
ToolEditForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default ToolEditForm;
