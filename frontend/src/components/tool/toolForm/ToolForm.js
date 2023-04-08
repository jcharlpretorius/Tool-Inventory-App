import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ToolForm.scss';
import Card from '../../card/Card';

const ToolForm = ({
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
            onChange={handleInputChange}
            required
          />
          <label>Tool Name:</label>
          <input
            type="text"
            placeholder="Tool name"
            name="name"
            value={tool?.name}
            onChange={handleInputChange}
            required
          />
          <label>Tool Type:</label>
          <input
            type="text"
            placeholder="Tool Type"
            name="toolType"
            value={tool?.toolType}
            onChange={handleInputChange}
            required
          />
          <label>Tool Price:</label>
          <input
            type="text"
            placeholder="Tool Price"
            name="price"
            value={tool?.price}
            onChange={handleInputChange}
            required
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
          <label>Supplied ID:</label>
          <input
            type="text"
            placeholder="Supplier ID"
            name="supplierId"
            value={tool?.supplierId}
            onChange={handleInputChange}
            required
          />
          {/* <label>Tool Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ToolForm.modules}
            formats={ToolForm.formats}
          /> */}

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

// If you add description to the tool, use this
// react quill rich text editor
ToolForm.modules = {
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
ToolForm.formats = [
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

export default ToolForm;
