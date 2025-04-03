import { useState, useEffect } from 'react'
import styles from './Profile.module.scss'
import { Pages } from '../../components/structure/Pages'
import { showToast } from '../../utils/showToast'
import { useNavigate } from 'react-router-dom'
import { AccountCircle } from '@mui/icons-material'
import { TextInput } from '../../components/misc/TextInput'
import { Button } from '../../components/misc/Button'
import { PopupUser } from '../../components/misc/Popup/PopupUser'
import { getUser, updateUser } from '../../utils/Queries'
import { getCookie } from '../../utils/cookies'
import { isTokenValid } from '../../hoc/AuthContext'

export const Profile = () => {
  const [openPopupForm, setOpenPopupForm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth: any = isTokenValid(getCookie('_a_tc') as string)
  console.log(auth);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    getUser(auth?.ui, "user_id,name,email")
      .then((res: any) => {
        if (!res || res.length === 0) {
          throw new Error('User not found');
        }
        setUserData({
          name: res[0].name,
          email: res[0].email,
        });

        setIsLoading(false);
      })
      .catch((err: any) => {
        showToast('Erro ao carregar os dados do usuário', 'error');
      })
  }, [auth?.ui]);

  const handlePopupClick = async (isSubmit: boolean, inputValue?: string, typeForm?: string) => {
    if (!isSubmit) return setOpenPopupForm(null);

    if (typeForm === 'email') {
      if (!inputValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        showToast('Insira um email válido!', 'error');
        return;
      }
      const res = await updateUser(auth?.ui, { email: inputValue }).then((res: any) => {
        if (res.status !== 200) {
          throw new Error('Error updating user data');
        }

        showToast('E-mail atualizado com sucesso!', 'success');
        return "success";
      }).catch((err: any) => {
        showToast('Erro ao atualizar o e-mail', 'error');
        return "error";
      });

      return res;
    } else {
      if (
        !inputValue ||
        inputValue.length < 8 ||
        !/[A-Z]/.test(inputValue) ||
        !/[a-z]/.test(inputValue) ||
        !/[0-9]/.test(inputValue)
      ) {
        showToast('A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.', 'error', 'error-password-invalid');
        return;
      }

      const res = await updateUser(auth?.ui, { password: inputValue }).then((res: any) => {
        if (res.status !== 200) {
          throw new Error('Error updating user data');
        }

        showToast('Senha atualizada com sucesso!', 'success');
        setHasChanges(false);
        return "success";
      }).catch((err: any) => {
        showToast('Erro ao atualizar a senha', 'error');
        return "error";
      });

      return res;
    }
  };

  const handleSubmit = async () => {
    const { name } = userData;
    if (name) {
      await updateUser(auth?.ui, { name: name }).then((res: any) => {
        if (res.status !== 200) {
          throw new Error('Error updating user data');
        }

        showToast('Dados atualizados com sucesso!', 'success');
        setHasChanges(false);
      }
      ).catch((err: any) => {
        showToast('Erro ao atualizar os dados do usuário', 'error');
      });
    } else {
      showToast('Preencha todos os campos', 'error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  return (
    <Pages isLoading={isLoading}>
      {openPopupForm && (
        <PopupUser
          dados={openPopupForm === 'email' ? userData?.email : null}
          type={openPopupForm === 'email' ? 'email' : 'password'}
          onClick={handlePopupClick}
        />
      )}
      <div className={styles.profile}>
        <div className={styles.profile__main}>
          <div className={styles.profile__main__image}>
            <AccountCircle />
          </div>
          <div className={styles.profile__main__forms}>
            <TextInput
              value={userData.name}
              onChange={(e: any) => handleChange('name', e)}
              placeholder="Nome"
              type="text"
            />
            <div className={styles.profile__main__forms__item}>
              <TextInput
                value={userData?.email || ''}
                placeholder="E-mail"
                type="text"
                disabled
              />
              <TextInput
                value="••••••••"
                placeholder="Senha"
                type="text"
                disabled
              />
            </div>
          </div>
          <div className={styles.profile__main__buttons}>
            <div className={styles.profile__main__buttons__edit}>
              <Button
                text="Mudar Email"
                type="button"
                onClick={() => setOpenPopupForm('email')}
              />
              <Button
                text="Mudar Senha"
                type="button"
                onClick={() => setOpenPopupForm('senha')}
              />
            </div>
            <div className={`${styles.profile__main__buttons__save} ${!hasChanges ? styles.noChange : ''}`}>
              <Button text="Salvar" type="button" onClick={handleSubmit} active={hasChanges} />
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};