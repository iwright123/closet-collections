import  * as React from 'react';
import { useForm } from "react-hook-form";
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import axios from 'axios';

type clothingType = string;
type description = string;
type price = number;
type imageUrl = string;

// This type will be used later in the form.
type Item = {
  clothingType: clothingType;
  description: description;
  price: price;
  imageUrl: imageUrl;
};

  const AddItems: React.FC = () => {
    const {
      register,
      handleSubmit,
      errors
    } = useForm<Item>();

    const onSubmit = (data: Item): void => {
      axios.post('/items', data)
      .then(data => console.info(data))
      .catch(err => console.warn(err))
    };
    const [imageAdd, setImageAdd] = React.useState<string>('');
    const onImageUpload = (result) => {
      setImageAdd(result.info.url)
    }
    const handleAddImage = (e) => {
      setImageAdd(e.target.value)
    }
    return (
      <div className="AddItem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Clothing Type:
            <input
              type="text"
              name="clothingType"
              ref={register({ required: true })}
             />
          </label>
          {/* When there is an error
              tell the user about it */}
          {errors.clothingType && <div>Type is required.</div>}

          <label>
            Description:
            <input
              type="text"
              name="description"
              ref={register({ required: true })}
            />
          </label>

          {errors.description && <div>Description is required.</div>}

          <label>
            Price:
            <input
              type="text"
              name="price"
              ref={register({ required: false })}
            />
          </label>
          <label>
          Photo URL:
            <input
              type="text"
              name="imageUrl"
              value={imageAdd}
              onChange={handleAddImage}
              ref={register({ required: true })}
            />
          </label>
          <button>Send</button>
        </form>
        <div id='entryWidget'>
            <WidgetLoader /> Upload Image

            <Widget
              sources={ [ 'local', 'camera', 'dropbox' ] }
              resourceType={ 'image' }
              cloudName={ 'geonovember' }
              uploadPreset={ 'smiuh98k' }
              buttonText={ 'Open' }
              style={ {
                color: 'white',
                border: 'none',
                width: '120px',
                backgroundColor: '#bee3db',
                borderRadius: '4px',
                height: '25px'
              } }
              folder={ 'demo' }
              cropping={ false }
              onSuccess={ (result) => onImageUpload(result) }
              onFailure={ console.log('failure!!!') }
              logging={ false }
              customPublicId={ 'sample' }
              eager={ 'w_400,h_300,c_pad|w_260,h_200,c_crop' }
              use_filename={ false }
            />
          </div>
      </div>
    );
  };
  export default AddItems;