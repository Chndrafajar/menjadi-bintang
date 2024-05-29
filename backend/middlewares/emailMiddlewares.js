import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (email) => {
  try {
    // Konfigurasi transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gunakan variabel lingkungan untuk menyimpan kredensial email
        pass: process.env.EMAIL_PASS, // Gunakan variabel lingkungan untuk menyimpan kredensial kata sandi email
      },
    });

    // Konten email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Konfirmasi Registrasi',
      text: 'Terima kasih telah mendaftar! Silakan klik link berikut untuk mengkonfirmasi pendaftaran Anda: http://localhost:8080/confirm-registration',
      html: '<p>Terima kasih telah mendaftar! Silakan klik <a href="http://localhost:8080/confirm-registration">link berikut</a> untuk mengkonfirmasi pendaftaran Anda.</p>',
    };

    // Kirim email
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.response);
  } catch (error) {
    console.error('Error sending confirmation email:', error.message);
    throw new Error('Failed to send confirmation email');
  }
};

export { sendConfirmationEmail };
