import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

function GeneralConfig() {
  return (
    <>
      <PageHeader steps={['System', 'General Config']} />

      <Widget>
        <Widget.Header title="General Config" />
        <Widget.Body description="Desc" helpTo="#"></Widget.Body>
      </Widget>
    </>
  );
}

export default GeneralConfig;
