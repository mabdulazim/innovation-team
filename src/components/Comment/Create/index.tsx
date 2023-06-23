import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { useForm, validations } from 'hooks/useForm';
import { createComment } from 'services/commentService';
import styles from './styles.module.scss';

function CreateComment({ postId }: { postId: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async() => {
    setLoading(true);
    const comment = await createComment(data.title, data.body, data.userId);
    setLoading(false);

    if(comment) {
      handleClose();
    }
  }
  
  const { required } = validations;
  const { data, errors, handleChange, handleSubmit } = useForm({
    validations: {
      body: {
        required,
      }
    },
    onSubmit,
  });
  
  return (
    <div className={styles['container']}>
      <Button
        variant="contained"
        onClick={handleOpen}
        size="large"
      >Add a Comment</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className={styles['modal']}>
          <div className={styles['container']}>

            <div className={styles['titles']}>
              <h3>Add Comment</h3>
              <p>Write a comment</p>
            </div>

            <div className={styles['form']}>
              <TextField
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Write a comment"
                name="body"
                multiline
                rows={4}
                required={true}
                error={!!errors.body ? true : false}
              />

              <Button
                variant="contained"
                size="large"
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

export default CreateComment;
