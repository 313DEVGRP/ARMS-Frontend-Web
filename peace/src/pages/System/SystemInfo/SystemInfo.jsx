import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

function SystemInfo() {
  return (
    <>
      <PageHeader steps={['System', 'System Info']} />

      <Widget>
        <Widget.Header title="System Info" />
        <Widget.Body description="Desc" helpTo="#"></Widget.Body>
      </Widget>
    </>
  );
}

export default SystemInfo;
