//Score to rating
let score_rate = (score_num, low_high) => {
    let score_rate_val = "";
    if (low_high==2) {
        if (score_num==1) {
            score_rate_val = "High Sell/Consolidate";
        } else if (score_num==2) {
            score_rate_val = "Sell/Consolidate";
        } else if (score_num==3) {
            score_rate_val = "Unclear";
        } else if (score_num==4) {
            score_rate_val = "Hodl";
        } else if (score_num==5) {
            score_rate_val = "High Hodl";
        }
    } else if (low_high==1) {
        if (score_num==5) {
            score_rate_val = "High Sell/Consolidate";
        } else if (score_num==4) {
            score_rate_val = "Sell/Consolidate";
        } else if (score_num==3) {
            score_rate_val = "Unclear";
        } else if (score_num==2) {
            score_rate_val = "Hodl";
        } else if (score_num==1) {
            score_rate_val = "High Hodl";
        }
    }
    return score_rate_val;
  }
  
  //Weighted Score to rating
  let weight_rate = (rate_val) => {
    if (rate_val=="High Sell/Consolidate" || rate_val=="High Hodl") {
        weighted_score = 2
    } else {
        weighted_score = 1
    }
    return weighted_score;
  }
  
  //Hodl/Sell/Unclear
  let hsc_cat = (rate_val) => {
    let cat = "";
    if (rate_val=="Hodl" || rate_val=="High Hodl") {
        cat = "Hodl"
    } else if (rate_val=="Unclear") {
        cat = "Unclear"
    } else  {
        cat = "Sell/Consolidate"
    }
    return cat;
  }
  
  let hsc_score = (cat_val, score_num, spec_cat) => {
    if (cat_val == spec_cat){
        score = score_num;
    }   else {
        score = 0;
    }
    return score
  }
  
  
  //Rating of scores with weighting
  let rateit = (section_num, part_num) => {
    //Get field scores
    let hsc_1_1 = field1_1.value;
    let hsc_1_2 = field1_2.value;
    let hsc_1_3 = field1_3.value;
    let hsc_1_4 = field1_4.value;
    let hsc_1_5 = field1_5.value;
    let hsc_2_1 = field2_1.value;
    let hsc_2_2 = field2_2.value;
    let hsc_2_3 = field2_3.value;
    let hsc_2_4 = field2_4.value;
    let hsc_2_5 = field2_5.value;
    let hsc_3_1 = field3_1.value;
    let hsc_3_2 = field3_2.value;
    let hsc_3_3 = field3_3.value;
    let hsc_3_4 = field3_4.value;
    let hsc_3_5 = field3_5.value;
    let hsc_4_1 = field4_1.value;
    let hsc_4_2 = field4_2.value;
    let hsc_4_3 = field4_3.value;
    let hsc_4_4 = field4_4.value;
  
    //Add to an array
    let scoreArr = [];
    scoreArr[0] = hsc_1_1;
    scoreArr[1] = hsc_1_2;
    scoreArr[2] = hsc_1_3;
    scoreArr[3] = hsc_1_4;
    scoreArr[4] = hsc_1_5;
    scoreArr[5] = hsc_2_1;
    scoreArr[6] = hsc_2_2;
    scoreArr[7] = hsc_2_3;
    scoreArr[8] = hsc_2_4;
    scoreArr[9] = hsc_2_5;
    scoreArr[10] = hsc_3_1;
    scoreArr[11] = hsc_3_2;
    scoreArr[12] = hsc_3_3;
    scoreArr[13] = hsc_3_4;
    scoreArr[14] = hsc_3_5;
    scoreArr[15] = hsc_4_1;
    scoreArr[16] = hsc_4_2;
    scoreArr[17] = hsc_4_3;
    scoreArr[18] = hsc_4_4;
  
    //Assign a Character value for items
    if (section_num==1){
        if (part_num==1){
            let score1_1 = score_rate(scoreArr[0], 2);
            return score1_1;
        } else if (part_num==2) {
            let score1_2 = score_rate(scoreArr[1], 2);
            return score1_2;
        } else if (part_num==3) {
            let score1_3 = score_rate(scoreArr[2], 2);
            return score1_3;
        } else if (part_num==4) {
            let score1_4 = score_rate(scoreArr[3], 2);
            return score1_4;
        } else if (part_num==5) {
            let score1_5 = score_rate(scoreArr[4], 2);
            return score1_5;
        }
        
    } else if (section_num==2) {
        if (part_num==1){
            let score2_1 = score_rate(scoreArr[5], 2);
            return score2_1;
        } else if (part_num==2) {
            let score2_2 = score_rate(scoreArr[6], 2);
            return score2_2;
        } else if (part_num==3) {
            let score2_3 = score_rate(scoreArr[7], 2);
            return score2_3;
        } else if (part_num==4) {
            let score2_4 = score_rate(scoreArr[8], 2);
            return score2_4;
        } else if (part_num==5) {
            let score2_5 = score_rate(scoreArr[9], 2);
            return score2_5;
        }
  
    } else if (section_num==3) {
        if (part_num==1){
            let score3_1 = score_rate(scoreArr[10], 2);
            return score3_1;
        } else if (part_num==2) {
            let score3_2 = score_rate(scoreArr[11], 1);
            return score3_2;
        } else if (part_num==3) {
            let score3_3 = score_rate(scoreArr[12], 1);
            return score3_3;
        } else if (part_num==4) {
            let score3_4 = score_rate(scoreArr[13], 1);
            return score3_4;
        } else if (part_num==5) {
            let score3_5 = score_rate(scoreArr[14], 2);
            return score3_5;
        }
  
    } else if (section_num==4) {
        if (part_num==1){
            let score4_1 = score_rate(scoreArr[15], 2);
            return score4_1;
        } else if (part_num==2) {
            let score4_2 = score_rate(scoreArr[16], 1);
            return score4_2;
        } else if (part_num==3) {
            let score4_3 = score_rate(scoreArr[17], 1);
            return score4_3;
        } else if (part_num==4) {
            let score4_4 = score_rate(scoreArr[18], 1);
            return score4_4;
        } 
    }
  
  }