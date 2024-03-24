import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
dotenv.config();

const sendEmailDeadlineReminder = (receiverEmail, taskTitle, taskDescription, taskDeadline) => {
    console.log("hello running 1")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_ID, 
            pass: process.env.GOOGLE_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GOOGLE_ID, 
        to: receiverEmail, 
        subject: `Reminder for your task titled : ${taskTitle}`,
        text: `We hope this message finds you well. We wanted to inform you that you are nearing the limit for tasks in your task manager app. Here are the details of your current tasks:
Details of your task:
- Title: ${taskTitle}
- Description: ${taskDescription}
- Deadline: ${new Date(taskDeadline).toLocaleString()}

As you approach the limit, we encourage you to review your tasks and consider prioritizing or completing existing tasks. Keeping your task list organized and manageable is essential for productivity and efficiency.

Best regards,
Timely`
    }

    let currentDate = new Date(taskDeadline);
    currentDate.setMinutes(currentDate.getMinutes() - 30);
    let datetimeString = currentDate.toISOString();

    schedule.scheduleJob(datetimeString, () => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error.message);
            } else {
                console.log('Email sent:', info.response);
            }
        })
    });
};

const sendEmailDeadlineExceed = (receiverEmail, taskTitle, taskDescription, taskDeadline) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_ID, 
            pass: process.env.GOOGLE_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GOOGLE_ID, 
        to: receiverEmail, 
        subject: `Deadline Limit for : ${taskTitle}`,
        text: `We regret to inform you that your deadline limit has been exceeded.
Details of your task:
    - Title: ${taskTitle}
    - Description: ${taskDescription}
    - Deadline: ${new Date(taskDeadline).toLocaleString()}

We kindly advise you to review your time-management and consider making adjustments to stay within your deadlines. It's crucial to maintain discipline to achieve your goals. Keeping your task list organized and manageable is essential for productivity and efficiency.
Thank you for your attention to this matter.

Best regards,
Timely`
    }
    
    let currentDate = new Date(taskDeadline);
    currentDate.setMinutes(currentDate.getMinutes() + 1);
    let datetimeString = currentDate.toISOString();

    schedule.scheduleJob(datetimeString, () => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error.message);
            } else {
                console.log('Email sent:', info.response);
            }
        })
    });
};

export { sendEmailDeadlineReminder, sendEmailDeadlineExceed };