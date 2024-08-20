import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

function License() {
  return (
    <>
      <PageHeader steps={['System', 'License']} />

      <Widget>
        <Widget.Header title="License" />
        <Widget.Body description="Desc" helpTo="#"></Widget.Body>
      </Widget>
    </>
  );
}

export default License;
