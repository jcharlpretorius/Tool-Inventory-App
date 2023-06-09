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
          {/* <label>Tool Type:</label> */}
          {/* <div>
            <input class="input flex-item" type="text" list="toolType" />
            <datalist id="toolType">
              <option>Volvo</option>
              <option>Saab</option>
              <option>Mercedes</option>
              <option>Audi</option>
            </datalist>
            <div class="arrow"></div>
          </div> */}
          {/* <select name="toolType" id="toolType">
            <option value="Electric Tool" selected>
              Electric Tool
            </option>
            <option value="Cordless Tool">Cordless Tool</option>
            <option value="Hand Tool">Hand Tool</option>
            <option value="Gas Powered Tool">Gas Powered Tool</option>
            <option value="Automotive Tool">Automotive Tool</option>
            <option value="Garden Tool">Garden Tool</option>
            <option value="Safety Tool">Safety Tool</option>
            <option value="Wood Working Tool">Wood Working Tool</option>
          </select> */}
          {/* <input
            type="text"
            placeholder="Tool Type"
            name="toolType"
            value={tool?.toolType}
            onChange={handleInputChange}
            required
          /> */}
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
          <label>Tool Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ToolForm.modules}
            formats={ToolForm.formats}
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

// react quill rich text editor -> for tool description
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
