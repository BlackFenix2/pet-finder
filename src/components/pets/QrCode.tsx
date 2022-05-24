import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

type Props = {
  value: string;
};

const QrCode = (props: Props) => {
  return <QRCodeSVG size={256} value={props.value} />;
};

export default QrCode;
