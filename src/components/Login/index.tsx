import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { getUser } from 'services/userService';
import styles from './styles.module.scss';
import { useForm, validations } from 'hooks/useForm';

function Login() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(localStorage.getItem('name') || '');

  const onSubmit = async() => {
    setLoading(true);
    const user = await getUser(data.id);
    setLoading(false);

    if(!user?.id) {
      setErrors(_errs => ({ ..._errs, id: 'User not founded' }));
    } else {
      localStorage.setItem('name', user.name);
      setUserName(user.name);
      handleClose();
    }
  }

  const { required } = validations;
  const { data, errors, setErrors, handleChange, handleSubmit } = useForm({
    validations: {
      id: {
        required,
      },
      password: {
        required,
      },
    },
    onSubmit,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async() => {
    localStorage.removeItem('name');
    setUserName('');
  }
  
  return (
    <div className={styles['container']}>
      {userName ?
        <Button onClick={handleLogout}>
          {userName}
        </Button>
      :
        <Button onClick={handleOpen}>Login</Button>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className={styles['modal']}>
          <div className={styles['container']}>

            <div className={styles['titles']}>
              <h3>Welcome Back</h3>
              <p>Login to your account</p>
            </div>

            <div className={styles['form']}>
              <TextField
                onChange={handleChange}
                id="outlined-basic"
                label="ID"
                name="id"
                variant="outlined"
                required={true}
                error={!!errors.id ? true : false}
                helperText={errors.id}
              />

              <TextField
                onChange={handleChange}
                id="outlined-basic"
                label="Password"
                name="password"
                variant="outlined"
                required={true}
                error={!!errors.password ? true : false}
                helperText={errors.password}
              />

              <Button
                size={'large'}
                onClick={handleSubmit}
                disabled={loading}
              >
                Login</Button>
            </div>
          </div>          
        </div>
      </Modal>
    </div>
  );
}

export default Login;
