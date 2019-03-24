$(document).ready(function() {
  var clarityInfo = [
    {
      'grade': 'FL',
      'name': 'Flawless',
      'description': 'No inclusions and no blemishes visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'IF',
      'name': 'Internally Flawless',
      'description': 'No inclusions and only blemishes are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'VVS1',
      'name': 'Very, Very Slightly Included',
      'description': 'Minute inclusions that range from extremely difficult to very difficult to see are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'VVS2',
      'name': 'Very, Very Slightly Included',
      'description': 'Minute inclusions that range from extremely difficult to very difficult to see are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'VS1',
      'name': 'Very Slightly Included',
      'description': 'Minor inclusions that range from difficult to somewhat easy to see are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'VS2',
      'name': 'Very Slightly Included',
      'description': 'Minor inclusions that range from difficult to somewhat easy to see are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'SI1',
      'name': 'Slightly Included',
      'description': 'Noticeable inclusions that range from easy to very easy to see are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'SI2',
      'name': 'Slightly Included',
      'description': 'Noticeable inclusions that range from easy to very easy to see are visible to a skilled clarityr using 10x magnification.'
    },
    {
      'grade': 'I1',
      'name': 'Included',
      'description': 'Obvious inclusions are visible to a skilled clarityr using 10x magnification and may affect transparency and brilliance.'
    },
        {
      'grade': 'I2',
      'name': 'Included',
      'description': 'Obvious inclusions are visible to a skilled clarityr using 10x magnification and may affect transparency and brilliance.'
    },
        {
      'grade': 'I3',
      'name': 'Included',
      'description': 'Obvious inclusions are visible to a skilled clarityr using 10x magnification and may affect transparency and brilliance.'
    }
  ]
  var colorInfo = [
    {
      'grade': 'D',
      'name': 'Colorless'
    },
    {
      'grade': 'E',
      'name': 'Colorless'
    },
    {
      'grade': 'F',
      'name': 'Colorless'
    },
    {
      'grade': 'G',
      'name': 'Near Colorless'
    },
    {
      'grade': 'H',
      'name': 'Near Colorless'
    },
    {
      'grade': 'I',
      'name': 'Near Colorless'
    },
    {
      'grade': 'J',
      'name': 'Near Colorless'
    },
    {
      'grade': 'K',
      'name': 'Faint'
    },
    {
      'grade': 'L',
      'name': 'Faint'
    },
    {
      'grade': 'M',
      'name': 'Faint'
    },
    {
      'grade': 'N',
      'name': 'Very Light'
    },
    {
      'grade': 'O',
      'name': 'Very Light'
    },
    {
      'grade': 'P',
      'name': 'Very Light'
    },
    {
      'grade': 'Q',
      'name': 'Very Light'
    },
    {
      'grade': 'R',
      'name': 'Very Light'
    },
    {
      'grade': 'S',
      'name': 'Light'
    },
    {
      'grade': 'T',
      'name': 'Light'
    },
    {
      'grade': 'U',
      'name': 'Light'
    },
    {
      'grade': 'V',
      'name': 'Light'
    },
    {
      'grade': 'W',
      'name': 'Light'
    },
    {
      'grade': 'X',
      'name': 'Light'
    },
    {
      'grade': 'Y',
      'name': 'Light'
    },
    {
      'grade': 'Z',
      'name': 'Light'
    },
  ]
  $.each(colorInfo, function(i){
    colorInfo[i]['description'] = 'Diamonds are valued by how closely they approach colorlessness – the less color, the higher their value.';
  });

  var sliders = $('.slider__background--progress');
  var inputs = $('input[type="range"]');

  for (j = 0; j < inputs.length; j++){
    var info = eval($(inputs[j]).attr('id') + 'Info');
    var sectionName = $(inputs[j]).attr('id');
    setupSlider(inputs[j], info, sliders[j], sectionName);
  }

  function setupSlider(input, info, slider, sectionName){
    $(input).attr('max', info.length);
    updateSliderProgress($(input).val(), slider);

    $(input).on('change', function(){
      var section = $(this).val();
      var index = section - 1;
      var grade = info[index]['grade'];
      var name = info[index]['name'];
      var description = info[index]['description'];

      var $sectionDiv = $('#' + sectionName + '-section');
      $sectionDiv.find('.section__grade').text(grade);
      $sectionDiv.find('.section__name').text(name);
      $sectionDiv.find('.section__description').text(description);

      updateSliderProgress(section, slider);
    })
  }

  function updateSliderProgress(section, slider){
    var sliderInput = $(slider).siblings('input');
    var numberOfSections = sliderInput.attr('max') - 1;
    var sectionPercentage = 100 / numberOfSections;
    var currentProgress = sectionPercentage * (section - 1);
    $(slider).css('width', currentProgress + '%');
  };
});
