import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// Show message before user has been exited from account
// getPopup :: () -> void
const getPopup = async () => {
  let timerInterval;

  const { isConfirmed, isDenied, isDismissed } = await Swal.fire({
    title: 'Ваша сессия истекла!',
    html: `Вы не проявляли активности в программе более 30 минут.
    Для того что-бы обезопасить данные студентов во время вашего отсутствия, ваша сессия была прервана.
    Вы будете возвращены на страницу авторизации через <b></b> секунд.`,
    timer: 5000, // 5 seconds
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
        b.textContent = Math.round(Swal.getTimerLeft() / 1000);
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });

  if (isConfirmed || isDismissed || isDenied) {
    const cookies = new Cookies();
    await cookies.remove('auth-token', { path: '/' });
    window.location.href = '/';
  }
};

// Attach the token to the request header each time the server is contacted
axios.interceptors.request.use((config) => {
  const cookies = new Cookies();
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = `${import.meta.env.VITE_BASE_URL}${config.url}`;
  }
  if (cookies.get('auth-token')) config.headers['auth-token'] = cookies.get('auth-token');
  return config;
});

// If the token is expired, then issue a message and exit the system
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 419) await getPopup();
    return Promise.reject(error);
  },
);
