import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { useForm, validations } from 'hooks/useForm';
import { createPost } from 'services/postService';
import styles from './styles.module.scss';

function CreatePost() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async() => {
    setLoading(true);
    const post = await createPost(data.title, data.body, data.userId);
    setLoading(false);

    if(post) {
      handleClose();
    }
  }
  
  const { required } = validations;
  const { data, errors, handleChange, handleSubmit } = useForm({
    validations: {
      title: {
        required,
      },
      body: {
        required,
      }
    },
    onSubmit,
  });
  
  return (
    <div className={styles['container']}>
      <Button onClick={handleOpen}>Create Post</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className={styles['modal']}>
          <div className={styles['container']}>

            <div className={styles['titles']}>
              <h3>Create Post</h3>
              <p>Add title and body</p>
            </div>

            <div className={styles['form']}>
              <TextField
                onChange={handleChange}
                id="outlined-basic"
                label="Title"
                name="title"
                variant="outlined"
                required={true}
                error={!!errors.title ? true : false}
              />

              <TextField
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Body"
                name="body"
                multiline
                rows={4}
                required={true}
                error={!!errors.body ? true : false}
              />

              <Button
                size={'large'}
                onClick={handleSubmit}
                disabled={loading}
              >
                Create</Button>
            </div>
          </div>          
        </div>
      </Modal>
    </div>
  );
}

export default CreatePost;
