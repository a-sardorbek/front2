import { notification } from 'antd';
import 'antd/dist/antd.css';

export const errorNotification = (placement,sentence) => {
    notification.error({
      duration:3,
      style:{background:"#f2163e",color:"white"},
      description:
        `${sentence}`,
      placement,
      
    });
};

export const successNotification = (placement,sentence) => {
    notification.success({
      duration:3,
      style:{background:"rgb(75,181,67)",color:"white"},
      description:
        `${sentence}`,
      placement,
      
    });
};
  