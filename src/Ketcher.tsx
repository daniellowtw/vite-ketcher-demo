import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import Miew from 'miew';
import { Ketcher } from 'ketcher-core';
import { Editor } from 'ketcher-react';
import { useEffect, useRef } from 'react';
// Very important otherwise all the icons looks off.
// The library imports index.less which is not supported by vite out of the box.
import 'ketcher-react/dist/index.css';

interface KetcherProps {
  initialSmiles?: string;
  ketcherRef?: React.MutableRefObject<Ketcher | null>;
  onchange: (smiles: string) => void;
}

export const KetcherEditor = ({onchange, initialSmiles, ketcherRef}: KetcherProps) => {
  // This is a wrapper around the ketcher editor, taking in the initial smiles and the onchange function.
  const _ketcherRef = useRef<Ketcher | null>(null);
  const structServiceProvider = new StandaloneStructServiceProvider();
  // I'm not 100% sure if this is necessary, but it is included in the given examples.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Miew = Miew;

  useEffect(() => {
    if (_ketcherRef.current && initialSmiles) {
      _ketcherRef.current.setMolecule(initialSmiles);
    }
  }, [initialSmiles]);

  const handleOnInit = async (ketcher: Ketcher) => {
    _ketcherRef.current = ketcher;
    if (ketcherRef) ketcherRef.current = ketcher;

    // This is required to make the ketcher library as it assumes this object is available.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).ketcher = ketcher;
  }

  const errorHandler = (message: string) => {
    console.error(message);
  }

  return (
    <div style={{ height: "100%" }} onBlur={() => {
      _ketcherRef.current?.getSmiles(true).then(onchange);
    }}>
      <Editor
        onInit={handleOnInit}
        structServiceProvider={structServiceProvider}
        staticResourcesUrl={''}
        errorHandler={errorHandler}
      />
    </div>
  )
}
